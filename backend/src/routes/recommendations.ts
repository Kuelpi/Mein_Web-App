import { Router, Request, Response } from 'express';
import { getRecommendations } from '../services/recommendationService';

const router = Router();

// POST /api/recommendations
router.post('/', async (req: Request, res: Response) => {
  try {
    const { symptom, diagnosis, context } = req.body;
    
    if (!symptom && !diagnosis) {
      return res.status(400).json({ 
        error: 'Bitte geben Sie entweder ein Symptom oder eine Diagnose an.' 
      });
    }

    const result = await getRecommendations({
      symptom,
      diagnosis,
      context
    });

    res.json(result);
  } catch (error) {
    console.error('Fehler bei der Empfehlungsabfrage:', error);
    res.status(500).json({ 
      error: 'Ein Fehler ist bei der Verarbeitung Ihrer Anfrage aufgetreten.' 
    });
  }
});

export { router };
