import DMAutomation from "../../models/dmAutomation.model.js";

export const updateDmAutomation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { dmAutomationId, keyword, dmMessages, card, isActive } = req.body;

    const rule = await DMAutomation.findOne({ _id: dmAutomationId, user: userId });
    if (!rule) {
      return res.status(404).json({ error: "Rule not found" });
    }

    if (keyword !== undefined) {
      const exists = await DMAutomation.findOne({ 
        user: userId, 
        keyword, 
        _id: { $ne: dmAutomationId } 
      });
      if (exists) {
        return res.status(400).json({ error: "Keyword already exists" });
      }
      rule.keyword = keyword;
    }

    if (Array.isArray(dmMessages)) {
      rule.dmMessages = dmMessages;
    }

    if (card !== undefined) {
      rule.card = card;
    }

    if (isActive !== undefined) {
      rule.isActive = isActive;
    }

    await rule.save();

    return res.json({ message: "DM Automation rule updated successfully", rule });
  } catch (error) {
    console.error("Error updating DM automation:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
