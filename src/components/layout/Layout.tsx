import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ConsoleOutput from './ConsoleOutput';
import { useAppContext } from '../../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { activeSection } = useAppContext();
  
  const shouldShowConsole = activeSection !== 'logs';

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto space-y-6">
            {children}
            
            {shouldShowConsole && <ConsoleOutput />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;