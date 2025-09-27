import OpenAI from "openai";
const openAIClient = new OpenAI();


export async function getOpenAIResponse(input) {
    const response = await openAIClient.responses.create({
        model: "gpt-5-nano",
        input,
    });

    return response.output_text

   
}
