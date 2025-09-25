
import React, { useState, useCallback } from 'react';
import { FarmerProfile, RecommendationPlan, AdaptivePlan, ViewState } from './types';
import { generateInitialPlan, generateAdaptivePlan } from './services/geminiService';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.ONBOARDING);
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile | null>(null);
  const [initialPlan, setInitialPlan] = useState<RecommendationPlan | null>(null);
  const [adaptedPlan, setAdaptedPlan] = useState<AdaptivePlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleOnboardingSubmit = useCallback(async (profile: FarmerProfile) => {
    setIsLoading(true);
    setLoadingMessage('Synthesizing planetary-scale ecological data...');
    setError(null);
    setAdaptedPlan(null); // Clear previous adaptive plan on new submission
    try {
      const plan = await generateInitialPlan(profile);
      setFarmerProfile(profile);
      setInitialPlan(plan);
      setView(ViewState.DASHBOARD);
    } catch (err) {
      console.error(err);
      setError('Failed to generate initial plan. The quantum cognitive engine may be recalibrating. Please try again.');
      setView(ViewState.ONBOARDING);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  const handleSimulateScenario = useCallback(async (scenario: string) => {
    if (!initialPlan) return;
    setIsLoading(true);
    setLoadingMessage('Simulating quantum "what-if" scenarios...');
    setError(null);
    setAdaptedPlan(null);
    try {
      const plan = await generateAdaptivePlan(initialPlan, scenario);
      setAdaptedPlan(plan);
    } catch (err) {
      console.error(err);
      setError('Failed to generate adaptive response. The predictive model encountered an anomaly. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [initialPlan]);

  const handleReset = () => {
    setView(ViewState.ONBOARDING);
    setFarmerProfile(null);
    setInitialPlan(null);
    setAdaptedPlan(null);
    setError(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner message={loadingMessage} />;
    }

    switch (view) {
      case ViewState.ONBOARDING:
        return <OnboardingForm onSubmit={handleOnboardingSubmit} error={error} />;
      case ViewState.DASHBOARD:
        if (farmerProfile && initialPlan) {
          return (
            <Dashboard
              profile={farmerProfile}
              initialPlan={initialPlan}
              adaptedPlan={adaptedPlan}
              onSimulateScenario={handleSimulateScenario}
              error={error}
            />
          );
        }
        // Fallback to onboarding if state is inconsistent
        setView(ViewState.ONBOARDING);
        return <OnboardingForm onSubmit={handleOnboardingSubmit} error={"State inconsistency detected. Please start over."} />;
      default:
        return <OnboardingForm onSubmit={handleOnboardingSubmit} error={null} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans antialiased">
      <Header onReset={handleReset} showReset={view === ViewState.DASHBOARD} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
