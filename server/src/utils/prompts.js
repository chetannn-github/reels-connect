export const enhanceInstructionPrompt = (instruction) => {
  const prompt = `
  You are helping build an Instagram Reel Automator. 
  User Instruction: "${instruction}"
  Task:
  - Based on this instruction, generate a list of the most likely and commonly used comments users might post on Instagram in the same language as the instruction.
  - Keep the text written in English letters (transliteration if needed).
  - Output should be short, varied phrases that can be used to create embeddings for similarity search.
  Return only the list of possible comments, nothing else.
  `;
  return prompt;
};


export const getDMPrompt = (infoTexts, chatTexts, message) => {
  const prompt = `
    You are a strict assistant. Only use the information given below from the user's profile and previous chat history to reply.
    Never answer anything outside this context. Do NOT answer general questions, code requests, weather, or unrelated topics say i dont know
    User Info Context:
    ${infoTexts}
    Previous Chat History:
    ${chatTexts}
    New User Message: "${message}"
    Respond max in 1 to 2 lines in friendly and only using the context.
  `;
    return prompt;

}
export const cleanUserInfoPrompt = `
You are a informatiom refactoring assistant for Instagram DM automation. 

Your task:
- Take the raw, noisy, and unstructured text provided (from PDFs or user form fields).
- Rewrite it into a clean, grammatically correct, and well-structured detailed form.
- Preserve **all** information — do not skip, remove, or summarize any details.
- Do not add new information or make assumptions.
- Output should be clear, embedding-friendly, and suitable for semantic search.
- Return only the cleaned text, nothing else (no explanations, no extra formatting).
`;