import express from 'express';
import { chatWithMentor } from '../controllers/mentorController.js';

const router = express.Router();

router.post('/chat', chatWithMentor);

export default router;
