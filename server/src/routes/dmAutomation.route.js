import express from "express";
import { addDmAutomation, deleteDmAutomation, getDmAutomations , updateDmAutomation} from "../controllers/dmAutomation/index.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getDmAutomations);  
router.post("/", protect, addDmAutomation);
router.put("/", protect, updateDmAutomation);   
router.delete("/", protect, deleteDmAutomation);

export default router;