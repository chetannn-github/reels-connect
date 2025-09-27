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