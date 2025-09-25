
export interface FarmerProfile {
  location: string;
  goals: string;
}

export interface RecommendationPlan {
  cropVarietals: { name: string; reason: string }[];
  companionFlora: { name: string; purpose: string }[];
  soilProtocol: { step: string; details: string }[];
  waterManagement: { technique: string; projection: string };
  farmLayoutDescription: string;
}

export interface AdaptivePlan {
  scenario: string;
  immediateActions: { action: string; rationale: string }[];
  revisedProjections: { area: string; change: string }[];
  longTermAdjustments: string;
}

export enum ViewState {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
}
