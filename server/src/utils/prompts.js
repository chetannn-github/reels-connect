export const convertToJSONPrompt = (condition) => {
    const prompt = `
        SYSTEM: You are a JSON generator. Output MUST be only a single valid JSON object and nothing else.
        USER: Convert this natural-language instruction into a JSON object with key "rules" (array). 
        Each rule must have: 
        - id
        - condition (keep the original language, include 2-3 similar words, and also provide an English version)
        - action (one of: comment | dm | comment+dm | ignore)
        - commentMessage (refactor if needed)
        - dmMessage (refactor if needed)
        Do not include explanations or extra text. Refactor commentMessage, dmMessage freely; condition language must retain original meaning and at least 2-3 similar words.
        Instruction: <<<${condition}>>>
    `;
  return prompt;
}

export const enhanceInstructionPrompt = (instruction) => {
    const prompt = `
        User Instruction: "${instruction}"
        Convert this into a broad, generalised rule in plain English and Hinglish Both
        that captures the intent for semantic search.
        Keep it concise but clear.
        Output ONLY the normalised instruction.
    `;
    return prompt;
}
