import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { NetworkStatus } from './components/ui/NetworkStatus';
import { useAuthStore } from './stores/authStore';
import { useThemeStore } from './stores/themeStore';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { LoginPage } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { GridMonitoring } from './pages/GridMonitoring';
import { GridTopology } from './pages/GridTopology';
import { EnergyManagement } from './pages/EnergyManagement';
import { Performance } from './pages/Performance';
import { Analytics } from './pages/Analytics';
import { Optimization } from './pages/Optimization';
import { AiMl } from './pages/AiMl';
import { Security } from './pages/Security';
import { AiAgents } from './pages/AiAgents';
import { Simulation } from './pages/Simulation';
import { AlertManagement } from './pages/AlertManagement';
import { DataManagement } from './pages/DataManagement';
import { UserManagement } from './pages/UserManagement';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { performanceMonitor } from './utils/performance';

// Route configuration for better maintainability
const protectedRoutes = [
  { path: '/dashboard', component: Dashboard, errorBoundary: true },
  { path: '/monitoring', component: GridMonitoring, errorBoundary: true },
  { path: '/topology', component: GridTopology },
  { path: '/analytics', component: Analytics },
  { path: '/optimization', component: Optimization },
  { path: '/ai-ml', component: AiMl },
  { path: '/simulation', component: Simulation },
  { path: '/ai-agents', component: AiAgents },
  { path: '/reports', component: Reports },
  { path: '/energy', component: EnergyManagement, errorBoundary: true },
  { path: '/performance', component: Performance, errorBoundary: true },
  { path: '/alerts', component: AlertManagement },
];

// Admin/Operator restricted routes
const restrictedRoutes = [
  { path: '/security', component: Security, requiredRole: 'admin' as const },
  { path: '/data', component: DataManagement, requiredRole: 'operator' as const },
  { path: '/users', component: UserManagement, requiredRole: 'admin' as const },
  { path: '/settings', component: Settings, requiredRole: 'operator' as const },
];

function App() {
  const { checkAuth } = useAuthStore();
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Mark app initialization start
        performanceMonitor.mark('app-init-start');
        
        // Initialize authentication state from localStorage
        await checkAuth();
        
        // Initialize theme based on system preference
        initializeTheme();
        
        // Mark app initialization end
        performanceMonitor.mark('app-init-end');
        performanceMonitor.measure('app-initialization', 'app-init-start', 'app-init-end');
      } catch (error) {
        console.error('App initialization failed:', error);
      }
    };

    initializeApp();
  }, [checkAuth, initializeTheme]);

  // Render protected route wrapper
  const renderProtectedRoute = (
    path: string, 
    Component: React.ComponentType, 
    options?: { 
      errorBoundary?: boolean; 
      requiredRole?: 'admin' | 'operator' 
    }
  ) => (
    <Route
      key={path}
      path={path}
      element={
        <ProtectedRoute requiredRole={options?.requiredRole}>
          <Layout>
            {options?.errorBoundary ? (
              <ErrorBoundary>
                <Component />
              </ErrorBoundary>
            ) : (
              <Component />
            )}
          </Layout>
        </ProtectedRoute>
      }
    />
  );

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <NetworkStatus />
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected routes */}
            {protectedRoutes.map(({ path, component, errorBoundary }) =>
              renderProtectedRoute(path, component, { errorBoundary })
            )}
            
            {/* Restricted routes */}
            {restrictedRoutes.map(({ path, component, requiredRole }) =>
              renderProtectedRoute(path, component, { requiredRole })
            )}
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 catch-all - Add this route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;