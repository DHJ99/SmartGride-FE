import React from 'react';
import { useEffect } from 'react';
import { Zap, Play, Square, Wifi, WifiOff } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useGridStore } from '../stores/gridStore';
import { Button } from '../components/ui/Button';
import { MetricsGrid } from '../components/dashboard/MetricsGrid';
import { PowerChart } from '../components/dashboard/PowerChart';
import { GridStatus } from '../components/dashboard/GridStatus';
import { AlertCenter } from '../components/dashboard/AlertCenter';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    connectionStatus, 
    startSimulation, 
    stopSimulation, 
    lastUpdate 
  } = useGridStore();

  useEffect(() => {
    // Auto-start simulation when component mounts
    startSimulation();
    
    // Cleanup on unmount
    return () => {
      stopSimulation();
    };
  }, [startSimulation, stopSimulation]);

  const handleToggleSimulation = () => {
    if (connectionStatus === 'connected') {
      stopSimulation();
    } else {
      startSimulation();
    }
  };

  const formatLastUpdate = () => {
    if (!lastUpdate) return 'Never';
    const now = Date.now();
    const diff = now - lastUpdate;
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Smart Grid Control Center
            </h1>
            <p className="text-blue-100 text-lg">
              Welcome back, {user?.firstName}! Real-time grid monitoring and control.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm text-blue-100">Connection Status</p>
              <div className="flex items-center space-x-2">
                {connectionStatus === 'connected' ? (
                  <Wifi size={16} className="text-green-300" />
                ) : (
                  <WifiOff size={16} className="text-red-300" />
                )}
                <span className="font-medium capitalize">{connectionStatus}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">Last Update</p>
              <p className="font-medium">{formatLastUpdate()}</p>
            </div>
            <div className="text-right">
              <Button
                variant={connectionStatus === 'connected' ? 'secondary' : 'primary'}
                size="sm"
                onClick={handleToggleSimulation}
                icon={connectionStatus === 'connected' ? Square : Play}
                className="bg-white/20 hover:bg-white/30 border-white/30"
              >
                {connectionStatus === 'connected' ? 'Stop' : 'Start'} Simulation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <MetricsGrid />

      {/* Power Generation Chart */}
      <PowerChart />

      {/* Grid Status and Load Distribution */}
      <GridStatus />

      {/* Alert Center */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertCenter />
      </div>
    </div>
  );
};