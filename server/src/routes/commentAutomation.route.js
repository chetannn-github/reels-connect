import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { addCommentAutomation, getCommentAutomation, updateCommentAutomation, deleteCommentAutomation } from '../controllers/commentAutomation/index.js';



const router = express.Router();

router.use(protect);

router.post("/", addCommentAutomation);
router.get("/", getCommentAutomation);
router.put("/", updateCommentAutomation);
router.delete("/", deleteCommentAutomation);

export default router;
