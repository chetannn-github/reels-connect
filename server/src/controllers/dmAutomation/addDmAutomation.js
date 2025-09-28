import DMAutomation from "../../models/dmAutomation.model.js";

export const addDmAutomation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { keyword, dmMessages, card, isActive } = req.body;

    if (!keyword || (!Array.isArray(dmMessages) && !card)) {
      return res.status(400).json({ 
        error: "Keyword is required and at least one DM message or one card must be provided" 
      });
    }

    
    const exists = await DMAutomation.findOne({ user: userId, keyword });
    if (exists) {
      return res.status(400).json({ error: "Keyword already exists" });
    }

    
    const rule = new DMAutomation({
      user: userId,
      keyword,
      dmMessages: Array.isArray(dmMessages) ? dmMessages : [],
      card,
      isActive: isActive ?? true,
    });

    await rule.save();

    return res.json({ message: "DM Automation rule added", rule });
  } catch (error) {
    console.error("Error adding DM automation:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
