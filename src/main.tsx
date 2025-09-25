import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Types for better type safety
interface TouchEventWithTarget extends TouchEvent {
  target: EventTarget | null;
}

// PWA and mobile optimizations
const initializeServiceWorker = async (): Promise<void> => {
  // Only register service worker in production to avoid conflicts with Vite HMR
  if (!('serviceWorker' in navigator) || import.meta.env.DEV) {
    console.warn('Service Workers not supported in this environment');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('SW registered successfully:', registration);
    
    // Handle service worker updates
    registration.addEventListener('updatefound', () => {
      console.log('New service worker version available');
    });
  } catch (error) {
    console.warn('SW registration failed:', error);
  }
};

// Mobile optimization utilities
const initializeMobileOptimizations = (): void => {
  // Prevent zoom on double tap for iOS (more reliable method)
  let lastTouchEnd = 0;
  
  const handleTouchEnd = (event: TouchEvent): void => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  };

  // Prevent context menu on long press for specific elements
  const handleContextMenu = (event: Event): void => {
    const target = event.target as HTMLElement;
    if (target?.closest('.prevent-context-menu')) {
      event.preventDefault();
    }
  };

  // Add event listeners with passive option for better performance
  document.addEventListener('touchend', handleTouchEnd, { passive: false });
  document.addEventListener('contextmenu', handleContextMenu, { passive: false });

};

// Viewport meta tag optimization for mobile
const optimizeViewport = (): void => {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
  }
};

// Main initialization function
const initializeApp = async (): Promise<void> => {
  try {
    // Run initialization tasks
    await Promise.all([
      initializeServiceWorker(),
      Promise.resolve(initializeMobileOptimizations()),
      Promise.resolve(optimizeViewport()),
    ]);
    
    console.log('App initialization completed successfully');
  } catch (error) {
    console.error('App initialization failed:', error);
  }
};

// Error handling for React rendering
const renderApp = (): void => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Root element with id "root" not found in the document');
  }

  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

// Initialize app and render
const bootstrap = async (): Promise<void> => {
  try {
    await initializeApp();
    renderApp();
  } catch (error) {
    console.error('Failed to bootstrap application:', error);
    
    // Show user-friendly error message
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          flex-direction: column;
          font-family: system-ui, -apple-system, sans-serif;
          text-align: center;
          padding: 20px;
        ">
          <h1 style="color: #dc2626; margin-bottom: 16px;">Application Error</h1>
          <p style="color: #6b7280; margin-bottom: 24px;">
            Something went wrong while loading the application.
          </p>
          <button 
            onclick="window.location.reload()" 
            style="
              background: #3b82f6;
              color: white;
              padding: 12px 24px;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-size: 16px;
            "
          >
            Reload Page
          </button>
        </div>
      `;
    }
  }
};

// Start the application
bootstrap();