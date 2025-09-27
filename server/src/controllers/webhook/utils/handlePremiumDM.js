import { generateEmbedding } from "../../../config/openai.js";
import { pineconeClient } from "../../../config/pinecone.js";
import Chat from "../../../models/chat.model.js";
import Conversation from "../../../models/conversation.model.js";
import { sendDM } from "./sendDM.js";

export const handlePremiumDM = async (user, senderID, message, conversation) => {
  const chatHistory = await Chat.find({ conversationId: conversation._id })
    .sort({ createdAt: 1 })
    .limit(20);

  const chatTexts = chatHistory.map(c => `${c.direction === 'ig_to_user' ? 'User:' : 'You:'} ${c.message}`).join("\n");
  const messageEmbedding = await generateEmbedding(message);

  const queryResponse = await pineconeClient
    .index("reels-connect-vector")
    .namespace(`user_${user._id.toString()}`)
    .query({
      vector: messageEmbedding,
      topK: 3,
      includeMetadata: true,
    });

  const infoTexts = queryResponse.matches?.map(m => m.metadata?.text || "").join("\n") || "";

 
  const gptPrompt = `
    You are a strict assistant. Only use the information given below from the user's profile and previous chat history to reply.
    Never answer anything outside this context. Do NOT answer general questions, code requests, weather, or unrelated topics.
    User Info Context:
    ${infoTexts}
    Previous Chat History:
    ${chatTexts}
    New User Message: "${message}"
    Respond concisely and only using the context.
    `;

  const response = await openAIClient.chat.completions.create({
    model: "gpt-5",
    messages: [
      { role: "system", content: gptPrompt }
    ],
    temperature: 0,
  });

  const replyText = response.choices[0].message.content.trim();

  await sendDM(user.webhook_id, user.access_token, senderID, replyText, true);

  user.messagesSent += 1;
  await user.save();
};