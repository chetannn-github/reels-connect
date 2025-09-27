import { generateEmbedding } from "../../../config/openai.js";
import { pineconeClient } from "../../../config/pinecone.js";
import CommentAnalytics from "../../../models/comment.analytics.model.js";
import OpenAI from "openai";
import { replyToComment } from "./replyToComment.js";
import { sendDM } from "./sendDM.js";
import Instruction from "../../../models/instruction.model.js";

const client = new OpenAI();


export const handlePremiumComment = async (reel, webhookID, commentText, commentId, commenterUsername) => {
  try {
    console.log("💬 Premium Comment:", commentText);
    const postOwner = reel.user;
    const access_token = postOwner.access_token;

    // 1️⃣ Fetch all instructions for this reel
    const instructions = await Instruction.find({ reel: reel._id });
    if (!instructions.length) {
      console.log("No instructions found for this reel");
      return;
    }

    let prompt = `You are an reel automation engine. Given the following instructions for a reel, 
      choose the most suitable one for this comment and return ONLY JSON and nothing more not a single word because i will parse it in this format:
      { "instructionId": "<matching_instruction_id>", "action": "<comment|comment+dm|ignore>" }
      Instructions:\n
    `;
    instructions.forEach(ins => {
      prompt += `ID: ${ins._id}\nInstruction: ${ins.instruction}\nAction: ${ins.action}\nCommentMessage: ${ins.commentMessage}\nDMMessage: ${ins.dmMessage}\n\n`;
    });

    prompt += `Incoming comment: "${commentText}"`;

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }]
    });

    response = response.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(response.choices[0].message.content.trim());
    } catch (err) {
      console.error("Failed to parse GPT output:", response.choices[0].message.content);
      return;
    }

    const matched = instructions.find(i => i._id.toString() === parsed.instructionId);
    if (!matched) {
      console.log("❌ Matched instruction not found in DB");
      return;
    }

    // 4️⃣ Execute action
    if (parsed.action === "comment") {
      await replyToComment(commentId, matched.commentMessage, access_token);
    } else if (parsed.action === "comment+dm") {
      await replyToComment(commentId, matched.commentMessage, access_token);
      await sendDM(webhookID, access_token, commentId, matched.dmMessage, true);
    } else {
      console.log("🛑 Ignored comment");
    }

    // 5️⃣ Save analytics
    await CommentAnalytics.create({
      user: postOwner._id,
      reel: reel._id,
      commentText,
      commentor: commenterUsername,
      matchedRule: matched._id,
      dmMessage: parsed.action.includes("dm") ? matched.dmMessage : null,
      commentMessage: parsed.action.includes("comment") ? matched.commentMessage : null,
      dmSent: parsed.action.includes("dm"),
      commentSent: parsed.action.includes("comment")
    });

    console.log("📊 Analytics saved");
  } catch (err) {
    console.error("❌ Error in handlePremiumComment GPT-only:", err);
  }
};