import React from 'react';
import { Bot } from 'lucide-react';
import { AgentSelector } from '../components/ai-agents/AgentSelector';
import { ChatInterface } from '../components/ai-agents/ChatInterface';
import { QuickActions } from '../components/ai-agents/QuickActions';
import { AgentStatus } from '../components/ai-agents/AgentStatus';
import { useAIAgentsStore } from '../stores/aiAgentsStore';

export const AiAgents: React.FC = () => {
  const { activeAgentId, agents } = useAIAgentsStore();
  const activeAgent = agents.find(a => a.id === activeAgentId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative">
          <div className="flex items-center space-x-3 mb-2">
            <Bot size={32} className="text-white" />
            <h1 className="text-3xl font-bold">
              AI Agents & Assistants
            </h1>
          </div>
          <p className="text-indigo-100 text-lg">
            Intelligent conversational agents specialized in grid operations, maintenance, analytics, and security.
          </p>
        </div>
      </div>

      {/* Agent Selection */}
      {!activeAgentId && <AgentSelector />}

      {/* Active Chat Interface */}
      {activeAgentId && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Current Agent Info */}
            {activeAgent && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{activeAgent.avatar}</span>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {activeAgent.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activeAgent.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Online</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {activeAgent.specialties.slice(0, 2).map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Interface */}
            <ChatInterface />
          </div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions />
            
            {/* Agent Status */}
            <AgentStatus />
            
            {/* Switch Agent */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Switch Assistant
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {agents.filter(a => a.id !== activeAgentId).map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => useAIAgentsStore.getState().setActiveAgent(agent.id)}
                    className="p-2 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{agent.avatar}</span>
                      <div>
                        <div className="font-medium text-sm text-gray-900 dark:text-white">
                          {agent.name}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {agent.role}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Grid Operations
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Real-time system monitoring and operational guidance
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-3xl mb-3">🔧</div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Maintenance
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Predictive maintenance and equipment health monitoring
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Analytics
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Data analysis, forecasting, and performance insights
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Security
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Cybersecurity guidance and compliance support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};