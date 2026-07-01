import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import twinRoutes from './routes/twinRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/career-twin-ai';

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'career-twin-ai-server' });
});

app.use('/api/auth', authRoutes);
app.use('/api/twin', twinRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/mentor', mentorRoutes);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Internal server error' });
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    startServer();
  })
  .catch((error) => {
    console.warn('MongoDB unavailable, continuing with in-memory fallback.', error.message);
    startServer();
  });
