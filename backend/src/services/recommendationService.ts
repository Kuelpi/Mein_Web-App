import { checkForRedFlags } from './redFlagService';
import { getRecommendationByDiagnosis } from './knowledge/recommendationKnowledge';

interface RecommendationRequest {
  symptom?: string;
  diagnosis?: string;
  context?: {
    knownConditions?: string[];
    recentSurgery?: boolean;
    otherFactors?: Record<string, any>;
  };
}

export interface RecommendationResponse {
  isEmergency: boolean;
  emergencyMessage?: string;
  recommendations?: {
    id: string;
    title: string;
    description: string;
    category: 'lifestyle' | 'follow_up' | 'warning' | 'general';
    priority: 'high' | 'medium' | 'low';
    source?: string;
    lastUpdated: string;
  }[];
  metadata: {
    searchTerm: string;
    matchedDiagnoses: string[];
    timestamp: string;
  };
}

export const getRecommendations = async (
  request: RecommendationRequest
): Promise<RecommendationResponse> => {
  const searchTerm = request.diagnosis || request.symptom || '';
  const timestamp = new Date().toISOString();

  // 1. Prüfen auf rote Flaggen (Notfallsymptome)
  const redFlags = checkForRedFlags(searchTerm);
  
  if (redFlags.isEmergency) {
    return {
      isEmergency: true,
      emergencyMessage: redFlags.message,
      metadata: {
        searchTerm,
        matchedDiagnoses: [],
        timestamp
      }
    };
  }

  // 2. Empfehlungen basierend auf der Diagnose abrufen
  const { recommendations, matchedDiagnoses } = await getRecommendationByDiagnosis(
    searchTerm,
    request.context
  );

  return {
    isEmergency: false,
    recommendations,
    metadata: {
      searchTerm,
      matchedDiagnoses,
      timestamp
    }
  };
};
