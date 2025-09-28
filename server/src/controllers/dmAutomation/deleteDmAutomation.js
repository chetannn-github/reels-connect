import DMAutomation from "../../models/dmAutomation.model.js";

export const deleteDmAutomation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { dmAutomationId } = req.body;

    const rule = await DMAutomation.findOneAndDelete({ _id: dmAutomationId, user: userId });
    if (!rule) {
      return res.status(404).json({ error: "Rule not found" });
    }

    return res.json({ message: "Rule deleted successfully", rule });
  } catch (error) {
    console.error("Error deleting DM automation:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};