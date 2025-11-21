import { RecommendationResponse } from '../recommendationService';

// Typdefinition für die Wissensbasis-Einträge
interface KnowledgeBaseEntry {
  id: string;
  diagnosis: string[]; // Liste von Diagnose-Schlüsselwörtern
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
    category: 'lifestyle' | 'follow_up' | 'warning' | 'general';
    priority: 'high' | 'medium' | 'low';
    source: string;
    lastUpdated: string;
  }>;
}

// Beispielhafte Wissensbasis (später aus einer Datenbank oder JSON-Datei laden)
const KNOWLEDGE_BASE: KnowledgeBaseEntry[] = [
  {
    id: 'diabetes-mellitus',
    diagnosis: ['diabetes', 'zucker', 'diabetes mellitus', 'typ-2-diabetes', 'typ-1-diabetes'],
    recommendations: [
      {
        id: 'dm-daily-monitoring',
        title: 'Blutzucker regelmäßig kontrollieren',
        description: 'Messen Sie Ihren Blutzucker regelmäßig gemäß den Anweisungen Ihres Arztes und führen Sie ein Blutzuckertagebuch.',
        category: 'follow_up',
        priority: 'high',
        source: 'Deutsche Diabetes Gesellschaft (DDG) Leitlinie 2023',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'dm-foot-care',
        title: 'Tägliche Fußpflege',
        description: 'Untersuchen Sie täglich Ihre Füße auf Verletzungen, Rötungen oder Druckstellen. Tragen Sie bequemes Schuhwerk und vermeiden Sie Barfußlaufen.',
        category: 'lifestyle',
        priority: 'high',
        source: 'Nationale Versorgungsleitlinie Diabetes',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'dm-nutrition',
        title: 'Ausgewogene Ernährung',
        description: 'Achten Sie auf eine ausgewogene Ernährung mit viel Gemüse, Vollkornprodukten und mageren Eiweißquellen. Reduzieren Sie zuckerhaltige Lebensmittel und Getränke.',
        category: 'lifestyle',
        priority: 'medium',
        source: 'Deutsche Gesellschaft für Ernährung (DGE)',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'dm-exercise',
        title: 'Regelmäßige Bewegung',
        description: 'Bewegen Sie sich regelmäßig, mindestens 150 Minuten pro Woche moderate Aktivität wie zügiges Gehen, Schwimmen oder Radfahren.',
        category: 'lifestyle',
        priority: 'medium',
        source: 'Weltgesundheitsorganisation (WHO)',
        lastUpdated: '2024-01-15'
      }
    ]
  },
  {
    id: 'hypertonie',
    diagnosis: ['bluthochdruck', 'hypertonie', 'hoher blutdruck'],
    recommendations: [
      {
        id: 'ht-measure',
        title: 'Regelmäßige Blutdruckmessung',
        description: 'Messen Sie Ihren Blutdruck regelmäßig und notieren Sie die Werte in einem Blutdruckpass.',
        category: 'follow_up',
        priority: 'high',
        source: 'Deutsche Hochdruckliga',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'ht-salt',
        title: 'Salzarme Ernährung',
        description: 'Reduzieren Sie Ihre Salzaufnahme auf maximal 5-6g pro Tag. Vermeiden Sie stark verarbeitete Lebensmittel und salzen Sie sparsam.',
        category: 'lifestyle',
        priority: 'high',
        source: 'Deutsche Gesellschaft für Kardiologie',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'ht-stress',
        title: 'Stressreduktion',
        description: 'Bauen Sie regelmäßig Entspannungsübungen in Ihren Alltag ein, wie z.B. Atemübungen, progressive Muskelentspannung oder Meditation.',
        category: 'lifestyle',
        priority: 'medium',
        source: 'Bundeszentrale für gesundheitliche Aufklärung (BZgA)',
        lastUpdated: '2024-01-15'
      }
    ]
  },
  {
    id: 'rueckenschmerzen',
    diagnosis: ['rückenschmerzen', 'kreuzschmerzen', 'hexenschuss', 'lumbago', 'bws-syndrom', 'hws-syndrom'],
    recommendations: [
      {
        id: 'rs-movement',
        title: 'Bleiben Sie in Bewegung',
        description: 'Vermeiden Sie langes Sitzen oder Liegen. Sanfte Bewegung wie Spaziergänge können die Beschwerden lindern.',
        category: 'lifestyle',
        priority: 'high',
        source: 'Nationale Versorgungsleitlinie Kreuzschmerz',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'rs-warning',
        title: 'Warnzeichen beachten',
        description: 'Suchen Sie umgehend einen Arzt auf, wenn Sie Taubheitsgefühle, Lähmungen, Stuhl- oder Harninkontinenz oder starke Schmerzen entwickeln, die in die Beine ausstrahlen.',
        category: 'warning',
        priority: 'high',
        source: 'Deutsche Gesellschaft für Allgemeinmedizin',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'rs-ergonomics',
        title: 'Rückengerechtes Verhalten',
        description: 'Achten Sie auf eine rückengerechte Haltung beim Sitzen, Heben und Tragen. Vermeiden Sie ruckartige Bewegungen und einseitige Belastungen.',
        category: 'lifestyle',
        priority: 'medium',
        source: 'Deutsche Gesellschaft für Orthopädie und Unfallchirurgie',
        lastUpdated: '2024-01-15'
      }
    ]
  }
];

// Fallback-Empfehlungen, wenn keine spezifische Diagnose gefunden wird
const GENERAL_RECOMMENDATIONS = [
  {
    id: 'gen-hydration',
    title: 'Ausreichend trinken',
    description: 'Achten Sie auf eine ausreichende Flüssigkeitszufuhr von mindestens 1,5-2 Litern pro Tag, sofern nicht anders ärztlich verordnet.',
    category: 'general' as const,
    priority: 'medium' as const,
    source: 'Deutsche Gesellschaft für Ernährung (DGE)',
    lastUpdated: '2024-01-15'
  },
  {
    id: 'gen-sleep',
    title: 'Ausreichend Schlaf',
    description: 'Achten Sie auf ausreichenden und erholsamen Schlaf (7-9 Stunden pro Nacht).',
    category: 'lifestyle' as const,
    priority: 'medium' as const,
    source: 'Deutsche Gesellschaft für Schlafforschung und Schlafmedizin',
    lastUpdated: '2024-01-15'
  },
  {
    id: 'gen-doctor',
    title: 'Ärztlichen Rat einholen',
    description: 'Suchen Sie bei anhaltenden oder sich verschlechternden Beschwerden bitte einen Arzt auf.',
    category: 'warning' as const,
    priority: 'high' as const,
    source: 'Bundesärztekammer',
    lastUpdated: '2024-01-15'
  }
];

/**
 * Sucht nach passenden Empfehlungen basierend auf der Diagnose
 */
export const getRecommendationByDiagnosis = async (
  searchTerm: string,
  context?: any
): Promise<{
  recommendations: RecommendationResponse['recommendations'];
  matchedDiagnoses: string[];
}> => {
  if (!searchTerm || typeof searchTerm !== 'string') {
    return {
      recommendations: GENERAL_RECOMMENDATIONS,
      matchedDiagnoses: []
    };
  }

  const lowerSearchTerm = searchTerm.toLowerCase();
  const matchedEntries: KnowledgeBaseEntry[] = [];
  const matchedDiagnoses: string[] = [];

  // Durchsuche die Wissensbasis nach passenden Einträgen
  for (const entry of KNOWLEDGE_BASE) {
    const hasMatch = entry.diagnosis.some(term => 
      lowerSearchTerm.includes(term.toLowerCase())
    );
    
    if (hasMatch) {
      matchedEntries.push(entry);
      matchedDiagnoses.push(entry.diagnosis[0]); // Füge die primäre Diagnose hinzu
    }
  }

  // Wenn spezifische Einträge gefunden wurden, kombiniere deren Empfehlungen
  if (matchedEntries.length > 0) {
    // Entferne doppelte Empfehlungen anhand der ID
    const uniqueRecommendations = new Map();
    
    for (const entry of matchedEntries) {
      for (const rec of entry.recommendations) {
        if (!uniqueRecommendations.has(rec.id)) {
          uniqueRecommendations.set(rec.id, rec);
        }
      }
    }

    // Sortiere nach Priorität (high > medium > low)
    const sortedRecommendations = Array.from(uniqueRecommendations.values()).sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    return {
      recommendations: sortedRecommendations,
      matchedDiagnoses
    };
  }

  // Keine spezifischen Einträge gefunden, gebe allgemeine Empfehlungen zurück
  return {
    recommendations: GENERAL_RECOMMENDATIONS,
    matchedDiagnoses: []
  };
};
