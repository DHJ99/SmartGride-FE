import React, { useState } from 'react';
import { Brain, Database, TrendingUp, Settings } from 'lucide-react';
import { ModelManagement } from '../components/ai/ModelManagement';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { useOptimizationStore } from '../stores/optimizationStore';

export const AiMl: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'models' | 'training' | 'deployment' | 'monitoring'>('models');
  const { models } = useOptimizationStore();

  const tabs = [
    { id: 'models', label: 'Model Management', icon: Brain },
    { id: 'training', label: 'Training Pipeline', icon: TrendingUp },
    { id: 'deployment', label: 'Deployment', icon: Database },
    { id: 'monitoring', label: 'Monitoring', icon: Settings },
  ];

  const deployedModels = models.filter(m => m.status === 'deployed').length;
  const trainingModels = models.filter(m => m.status === 'training').length;
  const avgAccuracy = models.reduce((acc, m) => acc + m.accuracy, 0) / models.length;

  const renderTrainingPipeline = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp size={20} className="text-green-600" />
            <span>Training Pipeline Status</span>
          </CardTitle>
        </CardHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Training Jobs</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completed This Week</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">2.3h</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Training Time</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Training Jobs</h4>
            {[
              { name: 'Load Forecasting v2.2', progress: 78, eta: '45 min' },
              { name: 'Anomaly Detection v1.9', progress: 34, eta: '2.1 hours' },
              { name: 'Optimization Engine v3.1', progress: 92, eta: '12 min' },
            ].map((job, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">{job.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">ETA: {job.eta}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${job.progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{job.progress}% complete</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );

  const renderDeployment = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database size={20} className="text-blue-600" />
            <span>Model Deployment</span>
          </CardTitle>
        </CardHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">{deployedModels}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Deployed Models</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">99.9%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">1.2M</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">API Calls/Day</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">89ms</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Response</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Deployment Status</h4>
            {models.filter(m => m.status === 'deployed').map((model) => (
              <div key={model.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">{model.name}</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {model.deploymentInfo?.endpoint}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">Active</div>
                    <div className="text-xs text-gray-500">
                      {model.deploymentInfo?.requestCount.toLocaleString()} requests
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );

  const renderMonitoring = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings size={20} className="text-purple-600" />
            <span>Model Monitoring & Health</span>
          </CardTitle>
        </CardHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">{avgAccuracy.toFixed(1)}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Model Accuracy</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Critical Alerts</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-1">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Performance Warnings</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Model Health Status</h4>
            {models.map((model) => (
              <div key={model.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">{model.name}</span>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    model.accuracy > 95 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                    model.accuracy > 90 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {model.accuracy > 95 ? 'Excellent' : model.accuracy > 90 ? 'Good' : 'Needs Attention'}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Accuracy:</span>
                    <span className="ml-1 font-medium text-gray-900 dark:text-white">{model.accuracy.toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Precision:</span>
                    <span className="ml-1 font-medium text-gray-900 dark:text-white">{(model.performance.precision * 100).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Recall:</span>
                    <span className="ml-1 font-medium text-gray-900 dark:text-white">{(model.performance.recall * 100).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">F1 Score:</span>
                    <span className="ml-1 font-medium text-gray-900 dark:text-white">{(model.performance.f1Score * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative">
          <div className="flex items-center space-x-3 mb-2">
            <Brain size={32} className="text-white" />
            <h1 className="text-3xl font-bold">
              AI & Machine Learning Platform
            </h1>
          </div>
          <p className="text-purple-100 text-lg">
            Advanced machine learning model management, training pipelines, and deployment monitoring.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{models.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Models</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{deployedModels}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Deployed</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">{trainingModels}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Training</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{avgAccuracy.toFixed(1)}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Accuracy</div>
          </div>
        </Card>
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
        {activeTab === 'models' && <ModelManagement />}
        {activeTab === 'training' && renderTrainingPipeline()}
        {activeTab === 'deployment' && renderDeployment()}
        {activeTab === 'monitoring' && renderMonitoring()}
      </div>
    </div>
  );
};