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