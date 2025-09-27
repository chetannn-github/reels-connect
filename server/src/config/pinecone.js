import { Pinecone } from '@pinecone-database/pinecone';
import { PINECONE_API_KEY, PINECONE_INDEX } from './env.js';

export const pineconeClient = new Pinecone({
    apiKey: PINECONE_API_KEY
});

pineconeClient.index(PINECONE_INDEX);