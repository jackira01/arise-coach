import express from 'express';
import cors from 'cors';

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:3000').split(',');

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
