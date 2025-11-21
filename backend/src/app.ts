import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { router as recommendationsRouter } from './routes/recommendations';

// Initialisiere die Express-Anwendung
const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Sicherheitsheader
app.use(cors());   // CORS für Frontend-Kommunikation
app.use(express.json()); // JSON-Parsing

// Routen
app.use('/api/recommendations', recommendationsRouter);

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Nicht gefunden' });
});

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ein interner Serverfehler ist aufgetreten' });
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

export { app };
