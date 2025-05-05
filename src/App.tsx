import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/layout/Layout';
import Home from './components/sections/Home';
import DeviceInfo from './components/sections/DeviceInfo';
import UnlockTools from './components/sections/UnlockTools';
import FlashTools from './components/sections/FlashTools';
import StorageHealth from './components/sections/StorageHealth';
import InstallAPK from './components/sections/InstallAPK';
import Logs from './components/sections/Logs';

const AppContent = () => {
  const { activeSection } = useAppContext();
  
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'device-info':
        return <DeviceInfo />;
      case 'unlock-tools':
        return <UnlockTools />;
      case 'flash-tools':
        return <FlashTools />;
      case 'storage-health':
        return <StorageHealth />;
      case 'install-apk':
        return <InstallAPK />;
      case 'logs':
        return <Logs />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

function App() {
  return (
    <AppProvider>
      <div className="dark:bg-gray-900 min-h-screen">
        <AppContent />
      </div>
    </AppProvider>
  );
}

export default App;