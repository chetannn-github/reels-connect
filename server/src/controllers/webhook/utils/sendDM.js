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
                title: "hii",
                subtitle: "kese ho" || "",
                image_url: "https://wallpapers.com/images/hd/summer-with-mia-khalifa-c7fb0bjzu70sic09.jpg" || "",
                default_action:  undefined,
                buttons:  [],
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