import Groq from "groq-sdk";
import { GROQ_API_KEY } from "./env.js";

const groqClient = new Groq({ apiKey: GROQ_API_KEY});

export async function getGroqResponse(prompt) {
    const llmResponse = await groqClient.chat.completions.create({
        messages: [
        {
            role: "user",
            content: prompt,
        },
        ],
        model: "openai/gpt-oss-20b",
    });

    return llmResponse.choices[0]?.message?.content || "";
}

