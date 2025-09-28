import DMAutomation from "../../models/dmAutomation.model.js";

export const getDmAutomations = async (req, res) => {
  try {
    const userId = req.user._id;
    const rules = await DMAutomation.find({ user: userId });
    return res.json({ rules });
  } catch (error) {
    console.error("Error fetching DM automations:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};