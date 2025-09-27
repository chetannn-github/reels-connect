import { generateEmbedding } from "../../../config/openai.js";
import { pineconeClient } from "../../../config/pinecone.js";
import CommentAnalytics from "../../../models/comment.analytics.model.js";
import OpenAI from "openai";
import { replyToComment } from "./replyToComment.js";
import { sendDM } from "./sendDM.js";
import Instruction from "../../../models/instruction.model.js";


const client = new OpenAI();
export const handlePremiumCommentv2 = async (reel,webhookID,commentText,commentId,commenterUsername) => {
  try {
    console.log("💬 Premium Comment:", commentText);
    const postOwner = reel.user;
    const access_token = postOwner.access_token;
    const commentEmbedding = await generateEmbedding(commentText);

    const queryResponse = await pineconeClient
      .index("reels-connect-vector")
      .namespace(reel._id.toString())
      .query({
        vector: commentEmbedding,
        topK: 1,
        includeMetadata: true,
      });
    

    if (!queryResponse.matches?.length) {
      console.log("❌ No matching rule found");
      return;
    }

    const match = queryResponse.matches[0];
    const { instructionId } = match.metadata;

    const matchedInstruction = await Instruction.findById(instructionId);
    if(!matchedInstruction) return;

    const {action, commentMessage, dmMessage, refinedInstruction, instruction} = matchedInstruction;
    console.log(action,commentMessage, dmMessage, refinedInstruction, instruction);

    const gptCheck = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a rule executor. 
            Given a rule with action=${action} and the user's comment, 
            respond ONLY with one of: "comment", "comment+dm", or "ignore". Nothing extraa`
        },
        {
          role: "user",
          content: `Rule: Refined Instruction -> ${refinedInstruction} and actual Instruction -> ${instruction} \nIncoming Comment: ${commentText}`
        }
      ]
    });

    console.log(gptCheck.choices[0].message.content.trim());

    const finalAction = gptCheck.choices[0].message.content.trim().toLowerCase();
    console.log("✅ Final Action from GPT:", finalAction);

    if (finalAction === "comment") {
      await replyToComment(commentId, commentMessage, access_token);
    } else if (finalAction === "comment+dm") {
      await replyToComment(commentId, commentMessage, access_token);
      await sendDM(webhookID, access_token, commentId, dmMessage, true);
    } else {
      console.log("🛑 Ignored comment");
    }
    
    const analytics = new CommentAnalytics({
      user: postOwner._id,
      reel: reel._id,
      commentText,
      commentor: commenterUsername,
      matchedRule: instructionId,
      dmMessage: finalAction.includes("dm") ? dmMessage : null,
      commentMessage: finalAction.includes("comment") ? commentMessage : null,
      dmSent: finalAction.includes("dm"),
      commentSent: finalAction.includes("comment")
    });

    await analytics.save();
    console.log("📊 Analytics saved");
  } catch (err) {
    console.error("❌ Error in handlePremiumComment:", err);
  }
};