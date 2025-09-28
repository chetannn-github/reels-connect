import  DMAutomation  from "../../../models/dmAutomation.model.js"; 

export const getAutoDMResponse = async ({ userId, text }) => {
  try {
    const rules = await DMAutomation.find({ user: userId });

    if (!rules || rules.length === 0) {
      return null;
    }

    for (const rule of rules) {
      if (text.toLowerCase().includes(rule.keyword.toLowerCase())) {
        if (rule.dmMessages && rule.dmMessages.length > 0) {
          const randomIndex = Math.floor(Math.random() * rule.dmMessages.length);
          return rule.dmMessages[randomIndex];
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error in handleNormalDM:", error);
    return null;
  }
};
