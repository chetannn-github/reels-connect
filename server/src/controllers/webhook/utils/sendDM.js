import axios from "axios";

export const sendDM = async(webhookID,accessToken,receiverID,message,isOnComment) => {
  const key  = isOnComment ? "comment_id" : "id";
  try {
    const payload = {
      recipient: { [key]: receiverID },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
                title: card.title,
                subtitle: card.subtitle || "",
                image_url: card.image_url || "",
                default_action: card.default_action || undefined,
                buttons: card.buttons || [],
              },
            ],
          },
        },
      },
    };



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

    console.log("DM Sent" + message);
  } catch (error) {
    console.error("❌ Error sending private reply:", error.response?.data || error.message);
  }
}