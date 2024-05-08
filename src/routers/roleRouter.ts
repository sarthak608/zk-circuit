import express from 'express';
import { getRole, createRole } from '../controllers/generateRole';

const router = express.Router();

router.get('/get', getRole);

router.post('/create', createRole)

// router.post('/send-email', sendEmailToUser);

export default router;
