// nachsorge-assist/frontend/src/context/RecommendationContext.tsx
import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import axios from 'axios';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'lifestyle' | 'follow_up' | 'warning' | 'general';
  priority: 'high' | 'medium' | 'low';
  actions?: string[];
  source: string;
  lastUpdated: string;
  // Add keywords for better matching
  keywords?: string[];
  // Add related diagnoses/symptoms this recommendation applies to
  relatedTo?: string[];
}

interface RecommendationContextType {
  recommendations: Recommendation[];
  isLoading: boolean;
  error: string | null;
  isEmergency: boolean;
  emergencyMessage: string | null;
  searchRecommendations: (symptom: string, diagnosis: string) => Promise<void>;
  clearRecommendations: () => void;
}

const RecommendationContext = createContext<RecommendationContextType | undefined>(undefined);

export const useRecommendations = () => {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error('useRecommendations must be used within a RecommendationProvider');
  }
  return context;
};

export // Helper function to normalize and tokenize search terms
const normalizeTerm = (term: string): string[] => {
  if (!term) return [];
  return term
    .toLowerCase()
    .split(/[,\s]+/) // Split by commas or whitespace
    .filter(Boolean); // Remove empty strings
};

// Create a mapping of symptoms/diagnoses to recommendation IDs
const createRecommendationIndex = (recommendations: Recommendation[]): Map<string, string[]> => {
  const index = new Map<string, string[]>();
  
  recommendations.forEach(rec => {
    // Add direct matches from relatedTo array
    rec.relatedTo?.forEach(term => {
      const normalizedTerms = normalizeTerm(term);
      normalizedTerms.forEach(normalizedTerm => {
        if (!index.has(normalizedTerm)) {
          index.set(normalizedTerm, []);
        }
        index.get(normalizedTerm)?.push(rec.id);
      });
    });

    // Add matches from title and description
    const content = `${rec.title} ${rec.description}`.toLowerCase();
    const terms = [...(rec.keywords || []), ...(rec.relatedTo || [])].join(' ').toLowerCase().split(/\s+/);
    
    terms.forEach(term => {
      if (content.includes(term) && !index.has(term)) {
        index.set(term, [rec.id]);
      }
    });
  });

  return index;
};

// Emergency conditions that should trigger immediate alerts
const EMERGENCY_CONDITIONS = [
  'herzinfarkt', 'schlaganfall', 'atemnot', 'brustschmerzen', 
  'blutungen', 'bewusstlosigkeit', 'starker schwindel',
  'plötzliche lähmung', 'starke allergische reaktion'
];

export const RecommendationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmergency, setIsEmergency] = useState(false);
  const [emergencyMessage, setEmergencyMessage] = useState<string | null>(null);

  // Define all recommendations with additional metadata
  const allRecommendations = useMemo<Recommendation[]>(() => [
    // Allgemeine Gesundheitsempfehlungen
    {
      id: 'gen-1',
      title: 'Regelmäßige Bewegung',
      description: 'Bewegen Sie sich täglich mindestens 30 Minuten moderat, z.B. durch zügiges Gehen, Radfahren oder Schwimmen. Regelmäßige Bewegung stärkt das Herz-Kreislauf-System und beugt zahlreichen Erkrankungen vor.',
      category: 'lifestyle',
      priority: 'high',
      source: 'Bundesministerium für Gesundheit',
      lastUpdated: '2024-03-15',
      relatedTo: ['allgemein', 'bewegung', 'herz-kreislauf', 'prävention'],
      keywords: ['sport', 'aktivität', 'fitness', 'herz', 'kreislauf']
    },
    {
      id: 'gen-2',
      title: 'Ausgewogene Ernährung',
      description: 'Achten Sie auf eine ausgewogene Ernährung mit mindestens 5 Portionen Obst und Gemüse täglich, Vollkornprodukten, mageren Eiweißquellen und gesunden Fetten. Reduzieren Sie Zucker und Salz.',
      category: 'lifestyle',
      priority: 'high',
      source: 'Deutsche Gesellschaft für Ernährung',
      lastUpdated: '2024-02-20',
      relatedTo: ['allgemein', 'ernährung', 'gesundheit', 'diabetes', 'bluthochdruck'],
      keywords: ['obst', 'gemüse', 'vollkorn', 'eiweiß', 'fette', 'zucker', 'salz']
    },
    {
      id: 'gen-3',
      title: 'Ausreichend Schlaf',
      description: 'Achten Sie auf regelmäßige Schlafzeiten und eine Schlafdauer von 7-9 Stunden pro Nacht. Guter Schlaf fördert die Regeneration und stärkt das Immunsystem.',
      category: 'lifestyle',
      priority: 'medium',
      source: 'Deutsche Gesellschaft für Schlafforschung',
      lastUpdated: '2024-01-10',
      relatedTo: ['allgemein', 'schlaf', 'regeneration', 'immunsystem'],
      keywords: ['schlafhygiene', 'schlafstörungen', 'müdigkeit', 'erschöpfung']
    },
    // Nach Operationen
    {
      id: 'postop-1',
      title: 'Wundversorgung nach OP',
      description: 'Halten Sie die Operationswunde trocken und sauber. Wechseln Sie den Verband gemäß Anweisung des Arztes. Achten Sie auf Rötungen, Schwellungen oder Austritt von Flüssigkeit.',
      category: 'follow_up',
      priority: 'high',
      source: 'Deutsche Gesellschaft für Chirurgie',
      lastUpdated: '2024-03-01',
      relatedTo: ['operation', 'wundversorgung', 'wunde', 'verband', 'nahtentfernung'],
      keywords: ['operationswunde', 'wundheilung', 'infektion', 'rötung', 'schwellung']
    },
    {
      id: 'postop-2',
      title: 'Bewegung nach Bauch-OP',
      description: 'Beginnen Sie mit kurzen Spaziergängen und steigern Sie die Dauer langsam. Vermeiden Sie in den ersten 6 Wochen schweres Heben (>5kg) und anstrengende Tätigkeiten.',
      category: 'follow_up',
      priority: 'medium',
      source: 'Berufsverband der Deutschen Chirurgen',
      lastUpdated: '2024-02-15',
      relatedTo: ['bauchoperation', 'rehabilitation', 'bewegung', 'belastung'],
      keywords: ['bauchdecke', 'narben', 'rückenschmerzen', 'atmung']
    },
    // Chronische Erkrankungen
    {
      id: 'chron-1',
      title: 'Blutdruckkontrolle',
      description: 'Messen Sie regelmäßig Ihren Blutdruck. Optimal sind Werte unter 140/90 mmHg. Führen Sie ein Blutdruck-Tagebuch und zeigen Sie es bei Ihrem nächsten Arztbesuch vor.',
      category: 'follow_up',
      priority: 'high',
      source: 'Deutsche Hochdruckliga',
      lastUpdated: '2024-03-10',
      relatedTo: ['bluthochdruck', 'hypertonie', 'blutdruck', 'herz-kreislauf'],
      keywords: ['blutdruckmessung', 'blutdruckwerte', 'herz', 'gefäße']
    },
    {
      id: 'chron-2',
      title: 'Diabetes-Management',
      description: 'Kontrollieren Sie regelmäßig Ihren Blutzucker. Achten Sie auf Anzeichen von Über- oder Unterzuckerung. Tragen Sie immer Traubenzucker bei sich.',
      category: 'follow_up',
      priority: 'high',
      source: 'Deutsche Diabetes Gesellschaft',
      lastUpdated: '2024-02-28',
      relatedTo: ['diabetes', 'zuckerkrankheit', 'blutzucker', 'insulin'],
      keywords: ['hypoglykämie', 'hyperglykämie', 'blutzuckermessung', 'ernährung']
    },
    // Notfallwarnungen
    {
      id: 'warn-1',
      title: 'Anzeichen eines Schlaganfalls',
      description: 'Bei plötzlicher Schwäche, Lähmung, Sprach- oder Sehstörungen, Schwindel oder starken Kopfschmerzen sofort den Notruf 112 wählen!',
      category: 'warning',
      priority: 'high',
      source: 'Deutsche Schlaganfall-Hilfe',
      lastUpdated: '2024-01-15',
      relatedTo: ['schlaganfall', 'notfall', 'gehirn', 'blutgerinnsel'],
      keywords: ['lähmung', 'sprachstörung', 'sehstörung', 'kopfschmerzen', 'schwindel']
    },
    {
      id: 'warn-2',
      title: 'Verdacht auf Herzinfarkt',
      description: 'Bei starken Brustschmerzen, die in Arme, Schulterblätter, Hals, Kiefer oder Oberbauch ausstrahlen, sowie bei Atemnot und Übelkeit sofort den Notruf 112 alarmieren!',
      category: 'warning',
      priority: 'high',
      source: 'Deutsche Herzstiftung',
      lastUpdated: '2024-02-01',
      relatedTo: ['herzinfarkt', 'notfall', 'brustschmerzen', 'atemnot'],
      keywords: ['herz', 'notruf', 'schmerzen', 'übelkeit', 'schwitzen']
    },
    // Psychische Gesundheit
    {
      id: 'psy-1',
      title: 'Stressbewältigung',
      description: 'Bauen Sie regelmäßige Entspannungspausen in Ihren Alltag ein. Techniken wie progressive Muskelentspannung oder Atemübungen können helfen, Stress abzubauen.',
      category: 'lifestyle',
      priority: 'medium',
      source: 'Deutsche Gesellschaft für Psychiatrie',
      lastUpdated: '2024-01-20',
      relatedTo: ['stress', 'psychische gesundheit', 'entspannung', 'burnout'],
      keywords: ['muskelentspannung', 'atemübungen', 'meditation', 'ausgleich']
    },
    // Ältere Patienten
    {
      id: 'senior-1',
      title: 'Sturzprophylaxe',
      description: 'Beseitigen Sie Stolperfallen in der Wohnung. Tragen Sie festes Schuhwerk. Lassen Sie Seh- und Hörfähigkeit regelmäßig überprüfen.',
      category: 'general',
      priority: 'medium',
      source: 'Deutsche Gesellschaft für Geriatrie',
      lastUpdated: '2024-02-10',
      relatedTo: ['sturzgefahr', 'ältere menschen', 'mobilität', 'sicherheit'],
      keywords: ['stolperfallen', 'gehhilfe', 'gleichgewicht', 'knochenbruch']
    },
    // Impfungen
    {
      id: 'vax-1',
      title: 'Impfstatus überprüfen',
      description: 'Lassen Sie Ihren Impfstatus überprüfen. Besonders wichtig sind Auffrischimpfungen gegen Tetanus, Diphtherie, Keuchhusten und ggf. COVID-19.',
      category: 'follow_up',
      priority: 'medium',
      source: 'Robert Koch-Institut',
      lastUpdated: '2024-03-05',
      relatedTo: ['impfung', 'impfschutz', 'immunisierung', 'infektionsschutz'],
      keywords: ['tetanus', 'diphtherie', 'keuchhusten', 'covid', 'grippe']
    },
    // Medikamente
    {
      id: 'med-1',
      title: 'Medikamenteneinnahme',
      description: 'Nehmen Sie Ihre Medikamente regelmäßig nach Anweisung des Arztes ein. Setzen Sie Medikamente nicht ohne Rücksprache ab. Führen Sie eine aktuelle Medikamentenliste mit sich.',
      category: 'follow_up',
      priority: 'high',
      source: 'Bundesärztekammer',
      lastUpdated: '2024-02-20',
      relatedTo: ['medikamente', 'arzneimittel', 'therapietreue', 'nebenwirkungen'],
      keywords: ['einnahme', 'dosierung', 'wechselwirkungen', 'notfallmedikamente']
    }
  ], []);

  // Create search index
  const searchIndex = useMemo(() => createRecommendationIndex(allRecommendations), [allRecommendations]);

  const searchRecommendations = async (symptom: string, diagnosis: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Normalize and combine search terms
      const searchTerms = [
        ...normalizeTerm(symptom),
        ...normalizeTerm(diagnosis)
      ];

      // Check for emergency conditions
      const isEmergencyTerm = searchTerms.some(term => 
        EMERGENCY_CONDITIONS.some(emergencyTerm => 
          emergencyTerm.includes(term) || term.includes(emergencyTerm)
        )
      );

      if (isEmergencyTerm) {
        setIsEmergency(true);
        setEmergencyMessage('Ein medizinischer Notfall liegt vor. Bitte suchen Sie sofort einen Arzt auf oder wählen Sie den Notruf 112!');
        setRecommendations(allRecommendations.filter(rec => rec.category === 'warning'));
        return;
      }

      // Find matching recommendation IDs
      const matchedIds = new Set<string>();
      
      // First pass: exact matches
      searchTerms.forEach(term => {
        const ids = searchIndex.get(term);
        if (ids) {
          ids.forEach(id => matchedIds.add(id));
        }
      });

      // Second pass: partial matches if no exact matches found
      if (matchedIds.size === 0) {
  searchTerms.forEach(term => {
    // Convert searchIndex.entries() to an array before iterating
    Array.from(searchIndex.entries()).forEach(([key, ids]) => {
      if (key.includes(term) || term.includes(key)) {
        ids.forEach((id: string) => matchedIds.add(id));
      }
    });
  });
}

      // Get matched recommendations
      let matchedRecommendations = allRecommendations.filter(rec => matchedIds.has(rec.id));

      // If no matches, return general recommendations
      if (matchedRecommendations.length === 0) {
        matchedRecommendations = allRecommendations
          .filter(rec => rec.relatedTo?.includes('allgemein'))
          .slice(0, 3); // Limit to 3 general recommendations
      }

      // Sort by priority (high to low) and then by category
      matchedRecommendations.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return a.category.localeCompare(b.category);
      });

      // Update state
      setIsEmergency(false);
      setEmergencyMessage(null);
      setRecommendations(matchedRecommendations);
    } catch (err) {
      console.error('Fehler beim Abrufen der Empfehlungen:', err);
      setError('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearRecommendations = () => {
    setRecommendations([]);
    setError(null);
    setIsEmergency(false);
    setEmergencyMessage(null);
  };

  return (
    <RecommendationContext.Provider
      value={{
        recommendations,
        isLoading,
        error,
        isEmergency,
        emergencyMessage,
        searchRecommendations,
        clearRecommendations
      }}
    >
      {children}
    </RecommendationContext.Provider>
  );
};