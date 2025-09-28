import CommentAutomation from "../../../models/commentAutomation.model.js";

export const getCommentResponse = async (reel, commentText) => {
  try {
    const reelId = reel._id;
    const automations = await CommentAutomation.find({ reel: reelId, isActive: true });
    if (!automations || automations.length === 0) return null;

    for (const automation of automations) {
      if (commentText.toLowerCase().includes(automation.keyword.toLowerCase())) {
        automation.triggerCount += 1;
        await automation.save();

        let commentReply = null;
        if (automation.commentReplies && automation.commentReplies.length > 0) {
          const randomIndex = Math.floor(Math.random() * automation.commentReplies.length);
          commentReply = automation.commentReplies[randomIndex];
        }

        if (automation.dmCard) {
          const card = automation.dmCard;
          return {
            type: "card",
            commentReply,
            card: {
              title: card.title,
              subtitle: card.subtitle,
              image_url: card.image_url,
              button: card.button || null,
            },
          };
        }

        if (automation.dmMessages && automation.dmMessages.length > 0) {
          const randomIndex = Math.floor(Math.random() * automation.dmMessages.length);
          return {
            type: "text",
            commentReply,
            message: automation.dmMessages[randomIndex],
          };
        }

        if (commentReply) {
          return {
            type: "comment",
            commentReply,
            message: null,
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error in getCommentResponse:", error);
    return null;
  }
};
