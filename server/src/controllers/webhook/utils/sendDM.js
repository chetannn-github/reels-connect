import axios from "axios";

export const sendDM = async(webhookID,accessToken,recieverID,message,isOnComment) => {
  const key  = isOnComment ? "comment_id" : "id";
  try {
    const response = await axios.post(
      `https://graph.instagram.com/${webhookID}/messages`,
      {
        recipient: {[key]: recieverID },
        message: { text: message },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Private reply sent");
  } catch (error) {
    console.error("❌ Error sending private reply:", error.response?.data || error.message);
  }
}