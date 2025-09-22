import React, { useState, useEffect } from 'react';
import { Zap, Play, BarChart3, Target, GitCompare } from 'lucide-react';
import { SimulationEngine } from '../components/simulation/SimulationEngine';
import { ScenarioBuilder } from '../components/simulation/ScenarioBuilder';
import { SimulationResults } from '../components/simulation/SimulationResults';
import { StressTestPanel } from '../components/simulation/StressTestPanel';
import { ComparisonView } from '../components/simulation/ComparisonView';
import { useSimulationStore } from '../stores/simulationStore';
import { Button } from '../components/ui/Button';

export const Simulation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'engine' | 'scenarios' | 'results' | 'stress' | 'comparison'>('engine');
  const { generateMockData, scenarios } = useSimulationStore();

  useEffect(() => {
    if (scenarios.length === 0) {
      generateMockData();
    }
  }, [scenarios.length, generateMockData]);

  const tabs = [
    { id: 'engine', label: 'Simulation Engine', icon: Play },
    { id: 'scenarios', label: 'Scenario Builder', icon: Zap },
    { id: 'results', label: 'Results Analysis', icon: BarChart3 },
    { id: 'stress', label: 'Stress Testing', icon: Target },
    { id: 'comparison', label: 'Comparison View', icon: GitCompare },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative">
          <div className="flex items-center space-x-3 mb-2">
            <Zap size={32} className="text-white" />
            <h1 className="text-3xl font-bold">
              Grid Simulation & Scenario Testing
            </h1>
          </div>
          <p className="text-green-100 text-lg">
            Advanced simulation engine for what-if analysis, stress testing, and performance optimization scenarios.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-1">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                onClick={() => setActiveTab(tab.id as any)}
                icon={Icon}
                className="flex-1 justify-center"
              >
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'engine' && <SimulationEngine />}
        {activeTab === 'scenarios' && <ScenarioBuilder />}
        {activeTab === 'results' && <SimulationResults />}
        {activeTab === 'stress' && <StressTestPanel />}
        {activeTab === 'comparison' && <ComparisonView />}
      </div>
    </div>
  );
};