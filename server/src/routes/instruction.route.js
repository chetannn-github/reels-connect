import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { createInstruction } from "../controllers/instruction/index.js";
import checkPremium from "../middlewares/premium.middleware.js";

const router = express.Router();

router.post("/", protect,checkPremium ,createInstruction);
// router.put("/:instructionId", protect, editInstruction);
// router.delete("/:instructionId", protect, deleteInstruction);
// router.get("/:reelId", protect, listInstructions);

export default router;
