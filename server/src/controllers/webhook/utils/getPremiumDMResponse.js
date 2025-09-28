import { generateEmbedding, getOpenAIResponse } from "../../../config/openai.js";
import { pineconeClient } from "../../../config/pinecone.js";
import Chat from "../../../models/chat.model.js";
import { getDMPrompt } from "../../../utils/prompts.js";

export const getPremiumDMResponse = async (user, message, conversation) => {
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
  const DMPrompt = getDMPrompt(infoTexts,chatTexts,message);
  const replyText = await getOpenAIResponse(DMPrompt);
  return replyText;
};