import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import { Smartphone, Loader2 } from 'lucide-react';

const Header = () => {
  const { isDeviceConnected, deviceInfo, connectDevice, disconnectDevice } = useAppContext();
  const [isConnecting, setIsConnecting] = React.useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    connectDevice();
    setTimeout(() => setIsConnecting(false), 1500);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-purple-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 flex items-center justify-center h-10 w-10 rounded-lg bg-purple-600">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">FlashLab Pro</h1>
        </div>

        <div className="flex items-center space-x-4">
          {isDeviceConnected ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span className="text-sm font-medium mr-2">Connected:</span>
                <span className="text-sm">
                  {deviceInfo?.model} ({deviceInfo?.connectionType})
                </span>
              </div>
              <Button 
                variant="danger" 
                size="small" 
                onClick={disconnectDevice}
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button 
              variant="primary" 
              onClick={handleConnect}
              disabled={isConnecting}
              icon={isConnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined}
            >
              {isConnecting ? 'Connecting...' : 'Connect Device'}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;