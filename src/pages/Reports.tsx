import React, { useState } from 'react';
import { FileText, Layout, Calendar, Eye, Download, BarChart3 } from 'lucide-react';
import { ReportBuilder } from '../components/reports/ReportBuilder';
import { TemplateManager } from '../components/reports/TemplateManager';
import { ScheduledReports } from '../components/reports/ScheduledReports';
import { ReportPreview } from '../components/reports/ReportPreview';
import { ExportOptions } from '../components/reports/ExportOptions';
import { useReportsStore } from '../stores/reportsStore';
import { Button } from '../components/ui/Button';

export const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'builder' | 'templates' | 'scheduled' | 'preview' | 'export'>('builder');
  const { metrics } = useReportsStore();

  const tabs = [
    { id: 'builder', label: 'Report Builder', icon: Layout },
    { id: 'templates', label: 'Template Manager', icon: FileText },
    { id: 'scheduled', label: 'Scheduled Reports', icon: Calendar },
    { id: 'preview', label: 'Preview & Review', icon: Eye },
    { id: 'export', label: 'Export & Download', icon: Download },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative">
          <div className="flex items-center space-x-3 mb-2">
            <FileText size={32} className="text-white" />
            <h1 className="text-3xl font-bold">
              Reports & Documentation
            </h1>
          </div>
          <p className="text-emerald-100 text-lg">
            Advanced report generation, custom templates, automated scheduling, and comprehensive documentation management.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{metrics.totalReports}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Reports</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{metrics.reportsThisMonth}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">This Month</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{metrics.scheduledReports}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Scheduled</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{metrics.averageGenerationTime}s</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Generation</div>
          </div>
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
        {activeTab === 'builder' && <ReportBuilder />}
        {activeTab === 'templates' && <TemplateManager />}
        {activeTab === 'scheduled' && <ScheduledReports />}
        {activeTab === 'preview' && <ReportPreview />}
        {activeTab === 'export' && <ExportOptions />}
      </div>

      {/* Popular Templates */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <BarChart3 size={20} className="text-purple-600" />
          <span>Popular Report Templates</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.popularTemplates.map((template, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">{template}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">#{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};