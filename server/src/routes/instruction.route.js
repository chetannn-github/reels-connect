import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { createInstruction, getInstruction, deleteInstruction } from "../controllers/instruction/index.js";
import checkPremium from "../middlewares/premium.middleware.js";

const router = express.Router();

router.get("/", protect, getInstruction);
router.post("/", protect,checkPremium ,createInstruction);
router.delete("/", protect, deleteInstruction);


export default router;
