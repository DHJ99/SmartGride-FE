import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileHeader } from '../mobile/MobileHeader';
import { MobileNavigation } from '../mobile/MobileNavigation';
import { FloatingActionButton } from '../ui/FloatingActionButton';
import { PWAInstallPrompt } from '../mobile/PWAInstallPrompt';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Close sidebar when screen size changes to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPageTitle = (pathname: string) => {
    const routes: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/monitoring': 'Grid Monitoring',
      '/topology': 'Grid Topology',
      '/analytics': 'Analytics',
      '/optimization': 'AI Optimization',
      '/ai-ml': 'ML Models',
      '/security': 'Security',
      '/simulation': 'Simulation',
      '/ai-agents': 'AI Agents',
      '/reports': 'Reports',
      '/settings': 'Settings',
    };
    return routes[pathname] || 'Smart Grid';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header onMenuClick={() => setSidebarOpen(true)} />
        </div>
        
        {/* Mobile Header */}
        <div className="lg:hidden">
          <MobileHeader 
            onMenuClick={() => setSidebarOpen(true)}
            title={getPageTitle(location.pathname)}
          />
        </div>
        
        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6 overflow-x-hidden">
          <div className="max-w-full">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNavigation />
      </div>
      
      {/* Floating Action Button */}
      <FloatingActionButton />
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
};