import { createContext, useContext, useState, ReactNode } from 'react';
import { AppSection, ConsoleMessage, DeviceInfo } from '../types';

interface AppContextType {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  deviceInfo: DeviceInfo | null;
  setDeviceInfo: (info: DeviceInfo | null) => void;
  consoleMessages: ConsoleMessage[];
  addConsoleMessage: (message: string, type: ConsoleMessage['type']) => void;
  clearConsoleMessages: () => void;
  isDeviceConnected: boolean;
  connectDevice: () => void;
  disconnectDevice: () => void;
}

const defaultDeviceInfo: DeviceInfo = {
  model: 'Unknown',
  androidVersion: 'Unknown',
  bootloaderStatus: 'unknown',
  serialNumber: 'Unknown',
  connectionType: 'disconnected',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<AppSection>('home');
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);

  const addConsoleMessage = (message: string, type: ConsoleMessage['type'] = 'info') => {
    const newMessage: ConsoleMessage = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date(),
    };
    setConsoleMessages((prev) => [...prev, newMessage]);
  };

  const clearConsoleMessages = () => {
    setConsoleMessages([]);
  };

  // In a real app, this would connect to a device via ADB/Fastboot
  const connectDevice = () => {
    // Simulate device connection delay
    addConsoleMessage('Attempting to connect to device...', 'info');
    
    setTimeout(() => {
      const mockDeviceInfo: DeviceInfo = {
        model: 'Google Pixel 7',
        androidVersion: '13',
        bootloaderStatus: 'locked',
        serialNumber: 'ABCDEF123456',
        connectionType: 'adb',
      };
      
      setDeviceInfo(mockDeviceInfo);
      setIsDeviceConnected(true);
      addConsoleMessage('Device connected successfully', 'success');
    }, 1500);
  };

  const disconnectDevice = () => {
    setDeviceInfo(null);
    setIsDeviceConnected(false);
    addConsoleMessage('Device disconnected', 'info');
  };

  const value = {
    activeSection,
    setActiveSection,
    deviceInfo,
    setDeviceInfo,
    consoleMessages,
    addConsoleMessage,
    clearConsoleMessages,
    isDeviceConnected,
    connectDevice,
    disconnectDevice,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};