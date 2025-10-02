import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

export const extractPdfText = async (files) => {
  let allText = "";

  for (let file of files) {
    try {
      const bob = new Blob([file.buffer], { type: "application/pdf" });
      const loader = new WebPDFLoader(bob);

      const docs = await loader.load();
      const pageContent = docs[0]?.pageContent;
      allText += `\nPDF Content (${file.originalname}):\n${pageContent}\n`;
      
    } catch (err) {
      console.error(`❌ Error extracting from ${file.originalname}:`, err);
    }
  }

  return allText;
};