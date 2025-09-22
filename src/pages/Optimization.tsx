import React, { useState } from 'react';
import { Zap, Settings, BarChart3, Lightbulb, Target } from 'lucide-react';
import { OptimizationEngine } from '../components/ai/OptimizationEngine';
import { ScenarioSimulator } from '../components/ai/ScenarioSimulator';
import { RecommendationPanel } from '../components/ai/RecommendationPanel';
import { OptimizationResults } from '../components/ai/OptimizationResults';
import { Button } from '../components/ui/Button';

export const Optimization: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'engine' | 'scenarios' | 'recommendations' | 'results'>('engine');

  const tabs = [
    { id: 'engine', label: 'Optimization Engine', icon: Zap },
    { id: 'scenarios', label: 'Scenario Simulator', icon: BarChart3 },
    { id: 'recommendations', label: 'AI Recommendations', icon: Lightbulb },
    { id: 'results', label: 'Results Analysis', icon: Target },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative">
          <div className="flex items-center space-x-3 mb-2">
            <Zap size={32} className="text-white" />
            <h1 className="text-3xl font-bold">
              AI-Powered Grid Optimization
            </h1>
          </div>
          <p className="text-blue-100 text-lg">
            Advanced optimization algorithms and machine learning for maximum grid efficiency and performance.
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
        {activeTab === 'engine' && <OptimizationEngine />}
        {activeTab === 'scenarios' && <ScenarioSimulator />}
        {activeTab === 'recommendations' && <RecommendationPanel />}
        {activeTab === 'results' && <OptimizationResults />}
      </div>
    </div>
  );
};