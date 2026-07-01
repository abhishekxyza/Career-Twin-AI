import express from 'express';

const router = express.Router();

router.post('/generate', (req, res) => {
  const { skills = [] } = req.body;

  const roadmap = [
    'Core fundamentals',
    ...skills.slice(0, 3),
    'Backend systems',
    'Cloud foundations',
    'Portfolio launch',
    'Internship readiness',
  ];

  return res.json({ roadmap });
});

export default router;
