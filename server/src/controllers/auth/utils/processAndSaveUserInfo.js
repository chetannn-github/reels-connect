import { createEmbeddingAndSaveToDB } from "./createEmbeddingAndSaveToDB.js";
import { extractPdfText } from "./extractPdfText.js";
import { getOpenAIResponse } from "../../../config/openai.js";
import { enhanceInstructionPrompt } from "../../../utils/prompts.js";


export const processAndSaveUserInfo = async (userId, formData, uploadedFiles) => {
  let infoString = `
        Personal Information:
        Full Name: ${formData?.fullName || ""}
        Profession/Title: ${formData?.profession || ""}
        Company/Brand: ${formData?.company || ""}
        Areas of Expertise: ${formData?.expertise || ""}
        Personal Bio: ${formData?.personalBio || ""}
        Communication Style: ${formData?.communication_style || ""}
        FAQ Topics: ${formData?.faq_topics || ""}

        Business Information:
        Description: ${formData?.businessDescription || ""}
        Services/Products: ${formData?.services || ""}
        Key Achievements: ${formData?.achievements || ""}
  `;
  const pdfString = await extractPdfText(uploadedFiles);

  const totalString = infoString + pdfString;
  // const gptInput = enhanceInstructionPrompt + "GIVEN INFO is as follows ->> " + totalString

  // const information = await getOpenAIResponse(gptInput);
  // console.log(information)
  const chunksCount = await createEmbeddingAndSaveToDB(userId, totalString);
  console.log(`Saved ${chunksCount} chunks for user ${userId}`);
  return chunksCount;
};





