import imageCompression from "browser-image-compression";
import axios from "axios"
import { BASE } from "./api";

export const compressImageAndUpload = async(file) => {
  const options = {
      maxSizeMB: 1,          
      maxWidthOrHeight: 1024, 
      useWebWorker: true,
    };
   const compressedFile = await imageCompression(file, options);

   const formData = new FormData();
      formData.append("image", compressedFile, compressedFile.name);

    const res = await axios.post(`${BASE}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.url;
}