
import { GoogleGenAI, Type } from "@google/genai";
import type { FarmerProfile, RecommendationPlan, AdaptivePlan } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const initialPlanSchema = {
  type: Type.OBJECT,
  properties: {
    cropVarietals: {
      type: Type.ARRAY,
      description: "List of recommended crop varietals.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the crop varietal." },
          reason: { type: Type.STRING, description: "Reason for recommending this varietal." },
        },
        required: ["name", "reason"],
      },
    },
    companionFlora: {
      type: Type.ARRAY,
      description: "List of recommended native companion flora.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the companion plant." },
          purpose: { type: Type.STRING, description: "Purpose of this plant (e.g., pest deterrence, soil enrichment)." },
        },
        required: ["name", "purpose"],
      },
    },
    soilProtocol: {
      type: Type.ARRAY,
      description: "A bespoke microbial soil inoculant protocol.",
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.STRING, description: "The step in the protocol." },
          details: { type: Type.STRING, description: "Details of the step." },
        },
        required: ["step", "details"],
      },
    },
    waterManagement: {
      type: Type.OBJECT,
      description: "Projected water usage and management techniques.",
      properties: {
        technique: { type: Type.STRING, description: "Recommended water-saving technique." },
        projection: { type: Type.STRING, description: "Projected water usage impact." },
      },
      required: ["technique", "projection"],
    },
    farmLayoutDescription: {
      type: Type.STRING,
      description: "A description of the recommended 3D farm layout for visualization."
    },
  },
  required: ["cropVarietals", "companionFlora", "soilProtocol", "waterManagement", "farmLayoutDescription"],
};

const adaptivePlanSchema = {
  type: Type.OBJECT,
  properties: {
    scenario: {
      type: Type.STRING,
      description: "The climate scenario being addressed."
    },
    immediateActions: {
      type: Type.ARRAY,
      description: "Urgent actions to be taken immediately.",
      items: {
        type: Type.OBJECT,
        properties: {
          action: { type: Type.STRING, description: "The immediate action to take." },
          rationale: { type: Type.STRING, description: "The reason for this action." },
        },
        required: ["action", "rationale"],
      },
    },
    revisedProjections: {
      type: Type.ARRAY,
      description: "Updated projections based on the new scenario.",
       items: {
        type: Type.OBJECT,
        properties: {
          area: { type: Type.STRING, description: "The area of projection (e.g., Yield, Water Usage)." },
          change: { type: Type.STRING, description: "The projected change." },
        },
        required: ["area", "change"],
      },
    },
    longTermAdjustments: {
      type: Type.STRING,
      description: "Long-term strategic adjustments to the overall plan."
    },
  },
  required: ["scenario", "immediateActions", "revisedProjections", "longTermAdjustments"],
};


export const generateInitialPlan = async (profile: FarmerProfile): Promise<RecommendationPlan> => {
  const prompt = `Generate a "Phase 1: Ecosystem Restoration & Crop Initialization" plan for a farmer with the following profile: Location: ${profile.location}, Goals: "${profile.goals}".`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are Agri-Genius 2040, an autonomous agricultural co-intelligence. Your purpose is to provide hyper-optimized, regenerative ecosystem blueprints. Respond in valid JSON format according to the provided schema. Be concise, actionable, and futuristic in your recommendations, assuming 2040-level technology and climate projections.",
      responseMimeType: "application/json",
      responseSchema: initialPlanSchema,
    },
  });
  
  const jsonText = response.text.trim();
  return JSON.parse(jsonText) as RecommendationPlan;
};

export const generateAdaptivePlan = async (initialPlan: RecommendationPlan, scenario: string): Promise<AdaptivePlan> => {
  const prompt = `Given the initial agricultural plan: ${JSON.stringify(initialPlan)}, a sudden and unexpected climate event has occurred: "${scenario}". Generate an "Adaptive Response Protocol" to mitigate risks and adapt the strategy.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are Agri-Genius 2040. A critical climate event has occurred. You must provide an immediate 'Adaptive Response Protocol'. Respond in valid JSON format according to the provided schema. The advice must be urgent, precise, and actionable.",
      responseMimeType: "application/json",
      responseSchema: adaptivePlanSchema,
    },
  });

  const jsonText = response.text.trim();
  return JSON.parse(jsonText) as AdaptivePlan;
};
