import React from 'react';
import Card from '../ui/Card';
import { useAppContext } from '../../context/AppContext';
import { Smartphone, Cpu, Shield, Barcode } from 'lucide-react';

const DeviceInfo = () => {
  const { deviceInfo, addConsoleMessage } = useAppContext();

  React.useEffect(() => {
    addConsoleMessage('Loading device information...', 'info');
    // In a real app, we would fetch detailed device info here
    setTimeout(() => {
      addConsoleMessage('Device information loaded successfully', 'success');
    }, 1000);
  }, [addConsoleMessage]);

  if (!deviceInfo) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 dark:text-gray-400">Please connect a device to view information</p>
      </div>
    );
  }

  const infoItems = [
    {
      label: 'Device Model',
      value: deviceInfo.model,
      icon: <Smartphone className="h-5 w-5 text-purple-500" />,
    },
    {
      label: 'Android Version',
      value: deviceInfo.androidVersion,
      icon: <Cpu className="h-5 w-5 text-teal-500" />,
    },
    {
      label: 'Bootloader Status',
      value:
        deviceInfo.bootloaderStatus === 'locked'
          ? 'Locked'
          : deviceInfo.bootloaderStatus === 'unlocked'
          ? 'Unlocked'
          : 'Unknown',
      icon: <Shield className="h-5 w-5 text-orange-500" />,
    },
    {
      label: 'Serial Number',
      value: deviceInfo.serialNumber,
      icon: <Barcode className="h-5 w-5 text-blue-500" />,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">Device Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Basic Device Info">
          <div className="space-y-4">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-center">
                <div className="mr-3">{item.icon}</div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
                  <div className="font-medium text-gray-900 dark:text-white">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card title="Connection Status">
          <div className="flex items-center mb-4">
            <div className={`h-3 w-3 rounded-full mr-2 ${
              deviceInfo.connectionType !== 'disconnected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`}></div>
            <span className="font-medium">
              {deviceInfo.connectionType !== 'disconnected' 
                ? `Connected via ${deviceInfo.connectionType.toUpperCase()}` 
                : 'Disconnected'}
            </span>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium mb-2 dark:text-white">Connection Notes:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>ADB mode allows for app installation and system modification</li>
              <li>Fastboot mode is required for flashing and bootloader operations</li>
              <li>USB debugging must be enabled in Developer Options</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DeviceInfo;