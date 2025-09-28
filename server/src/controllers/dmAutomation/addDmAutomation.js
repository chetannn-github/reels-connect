import DMAutomation from "../../models/dmAutomation.model.js";

export const addDmAutomation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { keyword, dmMessages, isActive } = req.body;

    if (!keyword || !Array.isArray(dmMessages) || dmMessages.length === 0) {
      return res.status(400).json({ error: "Keyword and at least one DM message are required" });
    }

    // check if keyword already exists for user
    const exists = await DMAutomation.findOne({ user: userId, keyword });
    if (exists) {
      return res.status(400).json({ error: "Keyword already exists" });
    }

    const rule = new DMAutomation({
      user: userId,
      keyword,
      dmMessages,
      isActive: isActive ?? true,
    });

    await rule.save();

    return res.json({ message: "DM Automation rule added", rule });
  } catch (error) {
    console.error("Error adding DM automation:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};