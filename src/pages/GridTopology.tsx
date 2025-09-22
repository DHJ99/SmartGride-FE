import React, { useEffect } from 'react';
import { TopologyViewer } from '../components/grid/TopologyViewer';
import { GridControls } from '../components/grid/GridControls';
import { useTopologyStore } from '../stores/topologyStore';

export const GridTopology: React.FC = () => {
  const { startSimulation, stopSimulation } = useTopologyStore();

  useEffect(() => {
    // Auto-start simulation when component mounts
    startSimulation();
    
    // Cleanup on unmount
    return () => {
      stopSimulation();
    };
  }, [startSimulation, stopSimulation]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">
            Grid Topology Visualization
          </h1>
          <p className="text-indigo-100 text-lg">
            Interactive network visualization with real-time status monitoring and control capabilities.
          </p>
        </div>
      </div>

      {/* Topology Viewer */}
      <div className="relative h-[calc(100vh-280px)] min-h-[600px] lg:h-[calc(100vh-200px)]">
        <TopologyViewer />
        <GridControls />
      </div>

      {/* Instructions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Interaction Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Navigation</h3>
            <ul className="space-y-1">
              <li>• Click and drag to pan</li>
              <li>• Mouse wheel to zoom</li>
              <li>• Use controls to reset view</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Interaction</h3>
            <ul className="space-y-1">
              <li>• Click nodes for details</li>
              <li>• Click connections for info</li>
              <li>• Use quick actions in panels</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Status Colors</h3>
            <ul className="space-y-1">
              <li>• <span className="text-green-600">Green:</span> Online/Active</li>
              <li>• <span className="text-yellow-600">Yellow:</span> Warning/Overloaded</li>
              <li>• <span className="text-red-600">Red:</span> Critical/Fault</li>
              <li>• <span className="text-blue-600">Blue:</span> Maintenance</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Simulation</h3>
            <ul className="space-y-1">
              <li>• Real-time status updates</li>
              <li>• Power flow visualization</li>
              <li>• Automatic fault detection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};