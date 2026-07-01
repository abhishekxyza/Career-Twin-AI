import express from 'express';
import Twin from '../models/Twin.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const twin = await Twin.findOne({ userId: req.params.userId }).sort({ createdAt: -1 });
    if (!twin) {
      return res.status(404).json({ message: 'Twin not found.' });
    }

    return res.json(twin);
  } catch (error) {
    return res.status(500).json({ message: 'Could not retrieve twin.' });
  }
});

router.post('/:userId', async (req, res) => {
  try {
    const twin = await Twin.create({
      userId: req.params.userId,
      ...req.body,
    });

    return res.status(201).json(twin);
  } catch (error) {
    return res.status(500).json({ message: 'Could not create twin.' });
  }
});

export default router;
