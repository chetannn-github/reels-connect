import DMAutomation from "../../../models/dmAutomation.model.js"; 

export const getAutoDMResponse = async (userId, text) => {
  try {
    const rules = await DMAutomation.find({ user: userId, isActive: true });
    if (!rules || rules.length === 0) return null;

    for (const rule of rules) {
      if (text.toLowerCase().includes(rule.keyword.toLowerCase())) {
        rule.triggerCount += 1;
        await rule.save();

        if (rule.card) {
          const card = rule.card;
          const button = card.button;

          return {
            type: "card",
            card: {
              title: card.title,
              subtitle: card.subtitle,
              image_url: card.image_url,
              button,
            },
          };
        }


        if (rule.dmMessages && rule.dmMessages.length > 0) {
          const randomIndex = Math.floor(Math.random() * rule.dmMessages.length);
          return {
            type: "text",
            message: rule.dmMessages[randomIndex],
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error in getAutoDMResponse:", error);
    return null;
  }
};
