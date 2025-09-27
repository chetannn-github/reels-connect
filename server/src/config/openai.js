import OpenAI from "openai";
const openAIClient = new OpenAI();


export async function getOpenAIResponse(input) {
    const response = await openAIClient.responses.create({
        model: "gpt-5-nano",
        input,
    });
    return response.output_text
}


export const generateEmbedding = async (text) => {
  const response = await openAIClient.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });
  return response.data[0].embedding;
};