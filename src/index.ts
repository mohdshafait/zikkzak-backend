import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import roastRoutes from './routes/roastRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ───── MongoDB ─────
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB error:', err);
    process.exit(1);
  }
})();

// ───── Routes ─────
app.use('/api/roast', roastRoutes);

app.use('*', (_, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
