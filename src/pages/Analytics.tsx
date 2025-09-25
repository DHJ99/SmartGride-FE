import React, { useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import { PerformanceMetrics } from '../components/analytics/PerformanceMetrics';
import { HistoricalCharts } from '../components/analytics/HistoricalCharts';
import { PredictiveAnalysis } from '../components/analytics/PredictiveAnalysis';
import { ReportGenerator } from '../components/analytics/ReportGenerator';
import { DataFilters } from '../components/analytics/DataFilters';
import { useAnalyticsStore } from '../stores/analyticsStore';

export const Analytics: React.FC = () => {
  const { refreshData } = useAnalyticsStore();

  useEffect(() => {
    // Initialize analytics data when component mounts
    refreshData();
  }, [refreshData]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative">
          <div className="flex items-center space-x-3 mb-2">
            <BarChart3 size={32} className="text-white" />
            <h1 className="text-3xl font-bold">
              Analytics & Reporting
            </h1>
          </div>
          <p className="text-purple-100 text-lg">
            Advanced data analytics, predictive insights, and comprehensive reporting for optimal grid performance.
          </p>
        </div>
      </div>

      {/* Data Filters */}
      <DataFilters />

      {/* Performance Metrics */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Key Performance Indicators
        </h2>
        <PerformanceMetrics />
      </div>

      {/* Historical Analysis */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Historical Data Analysis
        </h2>
        <HistoricalCharts />
      </div>

      {/* Predictive Analytics */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Predictive Analytics & AI Insights
        </h2>
        <PredictiveAnalysis />
      </div>

      {/* Report Generation */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Report Generation & Scheduling
        </h2>
        <ReportGenerator />
      </div>
    </div>
  );
};