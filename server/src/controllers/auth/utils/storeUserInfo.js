import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { pineconeClient } from "../../../config/pinecone.js";
import { generateEmbedding } from "../../../config/openai.js";
import { PINECONE_INDEX } from "../../../config/env.js";

export const storeUserInfo = async (userId, infoString) => {
  if (!infoString || infoString.trim().length === 0) return 0;
  const namespace = `user_${userId}`;

  // await pineconeClient
  //   .index(PINECONE_INDEX)
  //   .delete({
  //     namespace,
  //     deleteAll: true,
  //   });
  console.log(`Existing vectors for ${namespace} deleted`);
  
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });
  const chunks = await splitter.splitText(infoString);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const embedding = await generateEmbedding(chunk);

    await pineconeClient
      .index(PINECONE_INDEX) 
      .namespace(namespace)
      .upsert([
        {
          id: `user_${userId}_chunk_${i}`,
          values: embedding,
          metadata: {
            userId,
            chunkIndex: i,
          },
        },
      ]);
  }

  return chunks.length;
};
