import mongoose, { Schema, Document } from 'mongoose';

export interface ITwin extends Document {
  userId: mongoose.Types.ObjectId;
  careerHealth: number;
  readiness: number;
  confidence: number;
  learningSpeed: number;
  resumeScore: number;
  dreamRoleFit: number;
  salarySignal: number;
  explanation: string;
  createdAt: Date;
}

const twinSchema = new Schema<ITwin>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  careerHealth: { type: Number, default: 84 },
  readiness: { type: Number, default: 78 },
  confidence: { type: Number, default: 81 },
  learningSpeed: { type: Number, default: 92 },
  resumeScore: { type: Number, default: 89 },
  dreamRoleFit: { type: Number, default: 74 },
  salarySignal: { type: Number, default: 86 },
  explanation: { type: String, default: 'Your digital twin is learning from your recent momentum.' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITwin>('Twin', twinSchema);
