import axios from "axios";

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
