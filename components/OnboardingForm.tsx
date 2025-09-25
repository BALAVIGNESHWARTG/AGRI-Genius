
import React, { useState } from 'react';
import type { FarmerProfile } from '../types';
import { AlertTriangleIcon, MapPinIcon, TargetIcon } from './IconComponents';

interface OnboardingFormProps {
  onSubmit: (profile: FarmerProfile) => void;
  error: string | null;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onSubmit, error }) => {
  const [location, setLocation] = useState('Jharkhand, India');
  const [goals, setGoals] = useState('Sustainable rice cultivation with maximum biodiversity co-benefit and carbon sequestration.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim() && goals.trim()) {
      onSubmit({ location, goals });
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-sky-400 mb-2">
          Initialize Agricultural Co-Intelligence
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Input your farm's coordinates and primary objectives to generate a hyper-personalized ecosystem blueprint.
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-6 flex items-center space-x-3" role="alert">
            <AlertTriangleIcon className="h-5 w-5"/>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="location" className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <MapPinIcon className="h-5 w-5 mr-2 text-sky-400" />
              Land Coordinates / Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Jharkhand, India"
              className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="goals" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <TargetIcon className="h-5 w-5 mr-2 text-green-400" />
                Primary Agricultural Goals
            </label>
            <textarea
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              rows={3}
              placeholder="e.g., Maximize carbon sequestration..."
              className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-sky-600 hover:from-green-600 hover:to-sky-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Generate Ecosystem Blueprint
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;
