import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { getAuthURL, handleCallBack, refreshLongLivedToken} from '../controllers/ig/index.js';


const router = express.Router();

router.get('/add', getAuthURL);             
router.get('/callback', handleCallBack);  
router.post('/refresh', protect, refreshLongLivedToken);

export default router;