import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Download, Upload, RefreshCw, User, Shield, Plug, Palette, Bell } from 'lucide-react';
import { SystemSettings } from '../components/settings/SystemSettings';
import { UserPreferences } from '../components/settings/UserPreferences';
import { SecuritySettings } from '../components/settings/SecuritySettings';
import { IntegrationSettings } from '../components/settings/IntegrationSettings';
import { ThemeCustomizer } from '../components/settings/ThemeCustomizer';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { useSettingsStore } from '../stores/settingsStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'system' | 'user' | 'security' | 'integration' | 'theme' | 'notifications'>('system');
  const { 
    exportSettings, 
    importSettings, 
    refreshSystemHealth, 
    systemHealth, 
    lastSaved,
    isLoading 
  } = useSettingsStore();

  useEffect(() => {
    // Refresh system health when component mounts
    refreshSystemHealth();
    
    // Set up periodic health refresh
    const interval = setInterval(refreshSystemHealth, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [refreshSystemHealth]);

  const tabs = [
    { id: 'system', label: 'System', icon: SettingsIcon, description: 'Grid parameters and system configuration' },
    { id: 'user', label: 'User Preferences', icon: User, description: 'Personal preferences and dashboard settings' },
    { id: 'security', label: 'Security', icon: Shield, description: 'Security policies and access control' },
    { id: 'integration', label: 'Integrations', icon: Plug, description: 'External system connections and APIs' },
    { id: 'theme', label: 'Theme', icon: Palette, description: 'Visual appearance and branding' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Alert and notification preferences' },
  ];

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importSettings(file);
    }
  };

  const formatUptime = (uptime: number) => {
    const days = Math.floor((Date.now() - uptime) / (24 * 60 * 60 * 1000));
    const hours = Math.floor(((Date.now() - uptime) % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return `${days}d ${hours}h`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-600 to-slate-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <SettingsIcon size={32} className="text-white" />
                <h1 className="text-3xl font-bold">
                  Settings & Configuration
                </h1>
              </div>
              <p className="text-gray-100 text-lg">
                Comprehensive system configuration, user preferences, and integration management.
              </p>
            </div>
            <div className="hidden md:block text-right space-y-2">
              <div className="text-sm text-gray-200">System Status</div>
              <div className="text-lg font-bold">Online</div>
              <div className="text-xs text-gray-300">
                Uptime: {formatUptime(systemHealth.uptime)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card padding="sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <SettingsIcon size={16} className="text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Configuration Management
              </span>
            </div>
            {lastSaved && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Last saved: {new Date(lastSaved).toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshSystemHealth}
              icon={RefreshCw}
              loading={isLoading}
            >
              Refresh Status
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportSettings}
              icon={Download}
            >
              Export Settings
            </Button>
            <label className="cursor-pointer">
              <Button
                variant="outline"
                size="sm"
                icon={Upload}
                as="span"
              >
                Import Settings
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-1">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                onClick={() => setActiveTab(tab.id as any)}
                icon={Icon}
                className="flex-col h-auto p-3 text-center"
              >
                <span className="text-sm font-medium">{tab.label}</span>
                <span className="text-xs text-gray-500 mt-1 hidden lg:block">
                  {tab.description}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'system' && <SystemSettings />}
        {activeTab === 'user' && <UserPreferences />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'integration' && <IntegrationSettings />}
        {activeTab === 'theme' && <ThemeCustomizer />}
        {activeTab === 'notifications' && <NotificationSettings />}
      </div>

      {/* System Information */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600 mb-1">v{systemHealth.version}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Platform Version</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600 mb-1">{systemHealth.license.type}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">License Type</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600 mb-1">
              {formatUptime(systemHealth.uptime)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">System Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600 mb-1">
              {new Date(systemHealth.lastBackup).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Last Backup</div>
          </div>
        </div>
      </Card>
    </div>
  );
};