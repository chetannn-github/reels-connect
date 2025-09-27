const checkPremium = async (req, res, next) => {
  try {
    const user = req.user; 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.plan !== "premium") {
      return res.status(403).json({
        message: "This feature is available only for premium users."
      });
    }

    next();
  } catch (err) {
    console.error("Premium check error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export default checkPremium;
