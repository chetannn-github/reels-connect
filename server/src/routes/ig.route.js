import express from 'express';

import { getAuthURL, handleCallBack} from '../controllers/ig/index.js';


const router = express.Router();

router.get('/add', getAuthURL);             
router.get('/callback', handleCallBack);  


export default router;