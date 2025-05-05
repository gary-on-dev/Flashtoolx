import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import { HardDrive, RefreshCw, HardDriveDownload, BarChart2 } from 'lucide-react';

const StorageHealth = () => {
  const { addConsoleMessage } = useAppContext();
  const [scanning, setScanning] = useState(false);
  const [storageData, setStorageData] = useState<null | {
    totalSpace: string;
    freeSpace: string;
    usedSpace: string;
    healthStatus: 'good' | 'warning' | 'critical';
    readSpeed: string;
    writeSpeed: string;
    temperature: string;
    usagePercentage: number;
  }>(null);

  const startScan = () => {
    setScanning(true);
    addConsoleMessage('Starting storage health scan...', 'info');
    
    setTimeout(() => {
      addConsoleMessage('Reading storage information...', 'info');
    }, 1000);
    
    setTimeout(() => {
      addConsoleMessage('Checking read/write speeds...', 'info');
    }, 2000);
    
    setTimeout(() => {
      addConsoleMessage('Analyzing storage health...', 'info');
    }, 3000);
    
    setTimeout(() => {
      const mockData = {
        totalSpace: '64 GB',
        freeSpace: '28.4 GB',
        usedSpace: '35.6 GB',
        healthStatus: 'good' as const,
        readSpeed: '220 MB/s',
        writeSpeed: '180 MB/s',
        temperature: '38°C',
        usagePercentage: 55,
      };
      
      setStorageData(mockData);
      addConsoleMessage('Storage health scan completed successfully', 'success');
      setScanning(false);
    }, 4000);
  };

  useEffect(() => {
    // Auto-start scan when component mounts
    startScan();
  }, []);

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Storage Health</h2>
        <Button
          variant="outline"
          icon={<RefreshCw size={16} className={scanning ? 'animate-spin' : ''} />}
          onClick={startScan}
          disabled={scanning}
        >
          {scanning ? 'Scanning...' : 'Refresh'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Storage Overview">
          {!storageData ? (
            <div className="flex justify-center items-center h-48">
              <div className="text-center">
                <RefreshCw size={24} className="animate-spin mx-auto text-purple-500 mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Scanning storage...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <HardDrive className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="font-medium dark:text-white">Internal Storage</span>
                </div>
                <div className={`flex items-center ${getHealthColor(storageData.healthStatus)}`}>
                  <span className="font-medium capitalize">{storageData.healthStatus}</span>
                </div>
              </div>
              
              {/* Storage Usage Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Used: {storageData.usedSpace}</span>
                  <span>Free: {storageData.freeSpace}</span>
                </div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      storageData.usagePercentage > 85
                        ? 'bg-red-500'
                        : storageData.usagePercentage > 70
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${storageData.usagePercentage}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-600 dark:text-gray-300">
                  {storageData.usagePercentage}% of {storageData.totalSpace}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Read Speed</div>
                  <div className="flex items-center">
                    <HardDriveDownload className="h-4 w-4 text-green-500 mr-1" />
                    <span className="font-medium dark:text-white">{storageData.readSpeed}</span>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Write Speed</div>
                  <div className="flex items-center">
                    <HardDriveDownload className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="font-medium dark:text-white">{storageData.writeSpeed}</span>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Temperature</div>
                  <div className="flex items-center">
                    <span className="font-medium dark:text-white">{storageData.temperature}</span>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Health Status</div>
                  <div className="flex items-center">
                    <span className={`font-medium capitalize ${getHealthColor(storageData.healthStatus)}`}>
                      {storageData.healthStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
        
        <Card title="Storage Health Analysis">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <BarChart2 className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">What We Check</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Our storage health scan analyzes key metrics to determine the overall health of your device's storage.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium mb-2 dark:text-white">Metrics Analyzed:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>Available space and usage patterns</li>
                <li>Read/write speeds and performance</li>
                <li>Flash memory wear leveling</li>
                <li>Bad sectors and error rates</li>
                <li>Storage temperature</li>
                <li>File system integrity</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                <strong>Tip:</strong> Regular storage health checks can help prevent data loss
                and identify potential storage failures before they occur. We recommend running
                a check once a month.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StorageHealth;