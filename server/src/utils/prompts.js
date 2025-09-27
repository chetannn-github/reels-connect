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
SYSTEM: You are a semantic normalizer if you want to write in hindi prefer hinglish. Output only one short sentence/phrase suitable for generating embeddings.
USER: Rewrite the following rule condition into a broader, generalized set of synonyms and phrasing that preserves intent in the original language. 
- Include at least 15 words in the same language(compulsory)  me rkhna  for examples. 
- If the instruction contains offensive words, include them in examples as-is.
Condition:
<<<
${instruction}
>>>
Example input: "comment contains offensive words"
Example output: "comments with gaali, behenchod, madrchod, insult, rude words, abusive content, disrespectful phrases, toxic comments, harmful language, bad words"
`;
    return prompt;
}
