import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Zap, 
  Settings, 
  Users, 
  Shield, 
  Activity,
  Database,
  AlertTriangle,
  TrendingUp,
  Network,
  X,
  Brain,
  Zap as OptimizationIcon,
  Bot,
  Play,
  FileText
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { hasPermission } from '../../utils/auth';
import { Button } from '../ui/Button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  requiredRole?: string;
  badge?: string;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Grid Monitoring', href: '/monitoring', icon: Activity, badge: 'Live' },
  { name: 'Grid Topology', href: '/topology', icon: Network },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Simulation', href: '/simulation', icon: Play },
  { name: 'AI Optimization', href: '/optimization', icon: OptimizationIcon },
  { name: 'ML Models', href: '/ai-ml', icon: Brain },
  { name: 'AI Agents', href: '/ai-agents', icon: Bot },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Energy Management', href: '/energy', icon: Zap },
  { name: 'Performance', href: '/performance', icon: TrendingUp },
  { name: 'Alerts', href: '/alerts', icon: AlertTriangle, badge: '3' },
  { name: 'Data Management', href: '/data', icon: Database, requiredRole: 'operator' },
  { name: 'User Management', href: '/users', icon: Users, requiredRole: 'admin' },
  { name: 'Security', href: '/security', icon: Shield, requiredRole: 'admin' },
  { name: 'Settings', href: '/settings', icon: Settings, requiredRole: 'operator' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuthStore();

  const filteredNavigation = navigation.filter(item => {
    if (!item.requiredRole) return true;
    return user && hasPermission(user.role, item.requiredRole);
  });

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:fixed lg:z-30
        safe-area-top safe-area-bottom
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:${isOpen ? 'translate-x-0' : 'translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Zap size={24} className="text-blue-400" />
              <span className="font-bold text-lg">Smart Grid</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              icon={X}
              className="lg:hidden text-gray-400 hover:text-white"
              aria-label="Close sidebar"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
            <ul className="space-y-1 px-2">
              {filteredNavigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={() => window.innerWidth < 1024 && onClose()}
                    className={({ isActive }) => `
                      flex items-center justify-between px-3 py-3 lg:py-2 rounded-lg text-sm font-medium transition-colors duration-200 touch-manipulation
                      ${isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={18} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`
                        px-2 py-0.5 text-xs rounded-full font-medium
                        ${item.badge === 'Live' 
                          ? 'bg-green-500 text-white animate-pulse' 
                          : 'bg-red-500 text-white'
                        }
                      `}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 safe-area-bottom">
            <div className="text-xs text-gray-400 space-y-1">
              <p>Smart Grid Platform</p>
              <p>v2.1.0 • Status: Online</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};