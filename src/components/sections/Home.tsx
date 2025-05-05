import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import { Smartphone, Unlock, FileCode, HardDrive, Package, FileText } from 'lucide-react';

const Home = () => {
  const { setActiveSection, connectDevice, isDeviceConnected } = useAppContext();

  const handleNavigate = (section: any) => {
    setActiveSection(section);
  };

  const features = [
    {
      title: 'Device Info',
      icon: <Smartphone className="h-8 w-8 text-purple-500" />,
      description: 'View detailed information about your connected Android device',
      section: 'device-info',
      requiresDevice: true,
    },
    {
      title: 'Unlock Tools',
      icon: <Unlock className="h-8 w-8 text-purple-500" />,
      description: 'Remove pattern locks and screen security from rooted devices',
      section: 'unlock-tools',
      requiresDevice: true,
    },
    {
      title: 'Flash Tools',
      icon: <FileCode className="h-8 w-8 text-purple-500" />,
      description: 'Flash images to device partitions using Fastboot',
      section: 'flash-tools',
      requiresDevice: true,
    },
    {
      title: 'Storage Health',
      icon: <HardDrive className="h-8 w-8 text-purple-500" />,
      description: 'Check your device storage health and performance metrics',
      section: 'storage-health',
      requiresDevice: true,
    },
    {
      title: 'Install APK',
      icon: <Package className="h-8 w-8 text-purple-500" />,
      description: 'Easily install APK applications on your device',
      section: 'install-apk',
      requiresDevice: true,
    },
    {
      title: 'Logs',
      icon: <FileText className="h-8 w-8 text-purple-500" />,
      description: 'View detailed logs from your device for troubleshooting',
      section: 'logs',
      requiresDevice: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to FlashLab Pro
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          The ultimate toolkit for Android device management, firmware flashing, and diagnostics
        </p>
        
        {!isDeviceConnected && (
          <div className="mt-6">
            <Button onClick={connectDevice} size="large">
              Connect Your Device
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const isDisabled = feature.requiresDevice && !isDeviceConnected;
          
          return (
            <Card key={feature.title} className="transform transition hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <Button
                  onClick={() => handleNavigate(feature.section)}
                  disabled={isDisabled}
                  variant={isDisabled ? 'outline' : 'primary'}
                  fullWidth
                >
                  {isDisabled ? 'Device Required' : `Open ${feature.title}`}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;