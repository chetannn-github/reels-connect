import axios from "axios";

export const sendPrivateReply = async(IG_USER_ID,ACCESS_TOKEN,RECIEVER_ID,DM_MESSAGE) => {
  try {
    const response = await axios.post(
      `https://graph.instagram.com/${IG_USER_ID}/messages`,
      {
        recipient: { id: RECIEVER_ID },
        message: { text: DM_MESSAGE },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    console.log("✅ Private reply sent:", response.data);
  } catch (error) {
    console.error("❌ Error sending private reply:", error.response?.data || error.message);
  }
}


export const sendDMOnComment = async(IG_USER_ID,ACCESS_TOKEN,COMMENT_ID,DM_MESSAGE) => {
  try {
    const response = await axios.post(
      `https://graph.instagram.com/${IG_USER_ID}/messages`,
      {
        recipient: { comment_id: COMMENT_ID },
        message: { text: DM_MESSAGE },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    console.log("✅ Private reply sent:", response.data);
  } catch (error) {
    console.error("❌ Error sending private reply:", error.response?.data || error.message);
  }
}



export const replyToComment = async  (commentId, message, accessToken) => {
  try {
    const url = `https://graph.instagram.com/v23.0/${commentId}/replies`;

    const response = await axios.post(url, null, {
      params: {
        message,
        access_token: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error replying to comment:", error.response?.data || error.message);
    throw error;
  }
}