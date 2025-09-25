
import React from 'react';
import type { FarmerProfile, RecommendationPlan, AdaptivePlan } from '../types';
// FIX: Import LeafIcon from IconComponents to remove redundant local definition.
import { AlertTriangleIcon, BotIcon, CheckCircle2Icon, DropletsIcon, LeafIcon, SproutIcon, ZapIcon } from './IconComponents';

interface DashboardProps {
  profile: FarmerProfile;
  initialPlan: RecommendationPlan;
  adaptedPlan: AdaptivePlan | null;
  onSimulateScenario: (scenario: string) => void;
  error: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, initialPlan, adaptedPlan, onSimulateScenario, error }) => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <InitialPlanDisplay plan={initialPlan} />
      <ScenarioSimulator onSimulate={onSimulateScenario} />
      {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg flex items-center space-x-3" role="alert">
            <AlertTriangleIcon className="h-5 w-5"/>
            <p className="text-sm">{error}</p>
          </div>
        )}
      {adaptedPlan && <AdaptivePlanDisplay plan={adaptedPlan} />}
    </div>
  );
};

const PlanCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg h-full">
        <div className="flex items-center mb-4">
            {icon}
            <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
        </div>
        <div className="text-gray-400 space-y-3">{children}</div>
    </div>
);

const InitialPlanDisplay: React.FC<{ plan: RecommendationPlan }> = ({ plan }) => (
    <section>
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-sky-400">Phase 1: Ecosystem Restoration & Crop Initialization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlanCard title="Crop Varietals" icon={<SproutIcon className="h-6 w-6 mr-3 text-green-400" />}>
                {plan.cropVarietals.map((item, index) => (
                    <div key={index}>
                        <p className="font-semibold text-gray-300">{item.name}</p>
                        <p className="text-sm">{item.reason}</p>
                    </div>
                ))}
            </PlanCard>
            <PlanCard title="Companion Flora" icon={<LeafIcon className="h-6 w-6 mr-3 text-green-500" />}>
                 {plan.companionFlora.map((item, index) => (
                    <div key={index}>
                        <p className="font-semibold text-gray-300">{item.name}</p>
                        <p className="text-sm">{item.purpose}</p>
                    </div>
                ))}
            </PlanCard>
            <PlanCard title="Soil Protocol" icon={<CheckCircle2Icon className="h-6 w-6 mr-3 text-yellow-400" />}>
                 {plan.soilProtocol.map((item, index) => (
                    <div key={index}>
                        <p className="font-semibold text-gray-300">{item.step}</p>
                        <p className="text-sm">{item.details}</p>
                    </div>
                ))}
            </PlanCard>
             <PlanCard title="Water Management" icon={<DropletsIcon className="h-6 w-6 mr-3 text-sky-400" />}>
                <p className="font-semibold text-gray-300">{plan.waterManagement.technique}</p>
                <p className="text-sm">{plan.waterManagement.projection}</p>
            </PlanCard>
            <div className="md:col-span-2 lg:col-span-2 bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg">
                <div className="flex items-center mb-4">
                    <BotIcon className="h-6 w-6 mr-3 text-purple-400" />
                    <h3 className="text-xl font-semibold text-gray-200">Holographic Farm Layout</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <img src="https://picsum.photos/seed/agri2040/400/300" alt="Holographic farm layout" className="rounded-lg col-span-1" />
                    <p className="text-gray-400 col-span-2">{plan.farmLayoutDescription}</p>
                </div>
            </div>
        </div>
    </section>
);

const ScenarioSimulator: React.FC<{ onSimulate: (scenario: string) => void }> = ({ onSimulate }) => (
    <section className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Dynamic Adaptation Simulation</h2>
        <p className="text-gray-400 mb-4">Introduce a sudden, unexpected micro-climate shift to test the system's adaptive response protocol.</p>
        <button 
          onClick={() => onSimulate('Unseasonal heavy monsoon surge')}
          className="flex items-center space-x-2 bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-300 font-semibold py-2 px-4 border border-yellow-500/30 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
            <ZapIcon className="h-5 w-5" />
            <span>Simulate Monsoon Surge</span>
        </button>
    </section>
);

const AdaptivePlanDisplay: React.FC<{ plan: AdaptivePlan }> = ({ plan }) => (
    <section className="animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Adaptive Response Protocol: {plan.scenario}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlanCard title="Immediate Actions" icon={<AlertTriangleIcon className="h-6 w-6 mr-3 text-red-400" />}>
                {plan.immediateActions.map((item, index) => (
                    <div key={index} className="border-l-2 border-red-500/50 pl-3">
                        <p className="font-semibold text-gray-300">{item.action}</p>
                        <p className="text-sm">{item.rationale}</p>
                    </div>
                ))}
            </PlanCard>
            <PlanCard title="Revised Projections" icon={<ZapIcon className="h-6 w-6 mr-3 text-orange-400" />}>
                {plan.revisedProjections.map((item, index) => (
                    <div key={index}>
                        <p className="font-semibold text-gray-300">{item.area}</p>
                        <p className="text-sm">{item.change}</p>
                    </div>
                ))}
                 <div className="mt-4 border-t border-gray-700 pt-3">
                    <p className="font-semibold text-gray-300">Long-Term Adjustments</p>
                    <p className="text-sm">{plan.longTermAdjustments}</p>
                </div>
            </PlanCard>
        </div>
    </section>
);


export default Dashboard;