import React from 'react';
import { useState } from 'react';
import { Menu, User, LogOut, Zap, Bell, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../ui/Button';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'operator':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'viewer':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            icon={Menu}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            Menu
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Zap size={24} className="text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Smart Grid
              </h1>
            </div>
            <div className="hidden sm:block h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            <div className="hidden sm:block">
              <p className="text-sm text-gray-600 dark:text-gray-400">Control Panel</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            icon={Bell}
            className="relative"
            aria-label="Notifications"
          >
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Info */}
          <div className="flex items-center space-x-3 relative">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.firstName} {user?.lastName}
              </p>
              <div className="flex items-center space-x-2">
                <span className={`
                  inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize
                  ${getRoleBadgeColor(user?.role || '')}
                `}>
                  {user?.role}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 h-8 bg-blue-600 rounded-full px-3 cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <User size={16} className="text-white" />
                <ChevronDown size={12} className="text-white" />
              </button>
              
              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="py-1">
                  <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};