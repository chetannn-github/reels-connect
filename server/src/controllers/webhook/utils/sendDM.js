import axios from "axios";

export const sendDM = async ( webhookID, accessToken, receiverID, content, isOnComment = false ) => {
  const key = isOnComment ? "comment_id" : "id";
  
  try {
    let payload;
    if (typeof content === "string") {
      payload = {
        recipient: { [key]: receiverID },
        message: { text: content },
      };
    }else if (typeof content === "object" && content !== null) {
      payload = {
        recipient: { [key]: receiverID },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [
                {
                  title: content.title || "No Title",
                  subtitle: content.subtitle || "",
                  image_url: content.image_url || "",
                  default_action: content.default_action || undefined,
                  buttons: content.button ? [content.button] : [],
                },
              ],
            },
          },
        },
      };
    } else {
      throw new Error("Invalid content for DM");
    }

    const response = await axios.post(
      `https://graph.instagram.com/${webhookID}/messages`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("✅ DM Sent:", content);
    return response.data;
  } catch (error) {
    console.error("❌ Error sending DM:", error.response?.data || error.message);
    return null;
  }
};
