import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import { Package, Upload, Check, X, Folder } from 'lucide-react';

const InstallAPK = () => {
  const { addConsoleMessage } = useAppContext();
  const [apkFile, setApkFile] = useState<string | null>(null);
  const [installing, setInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);

  const handleSelectFile = () => {
    // In a real app, this would open a file picker
    // Simulating file selection
    const fileName = 'my_app_v1.2.apk';
    setApkFile(fileName);
    addConsoleMessage(`Selected APK file: ${fileName}`, 'info');
  };

  const handleInstall = () => {
    if (!apkFile) {
      addConsoleMessage('No APK file selected', 'error');
      return;
    }

    setInstalling(true);
    setInstallProgress(0);
    addConsoleMessage(`Starting installation of ${apkFile}...`, 'info');
    
    // Simulate the installation process with progress updates
    const interval = setInterval(() => {
      setInstallProgress((prev) => {
        const newProgress = prev + 10;
        
        if (newProgress === 30) {
          addConsoleMessage('Verifying APK...', 'info');
        } else if (newProgress === 50) {
          addConsoleMessage('Installing package...', 'info');
        } else if (newProgress === 80) {
          addConsoleMessage('Finalizing installation...', 'info');
        } else if (newProgress >= 100) {
          clearInterval(interval);
          addConsoleMessage('APK installed successfully!', 'success');
          setInstalling(false);
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">Install APK</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Install Application">
          <div className="space-y-4">
            <div className="flex items-start mb-4">
              <div className="mr-3 mt-1">
                <Package className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Install APK</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Install an Android application package (APK) directly to your connected device.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                APK File
              </label>
              <div className="flex items-center">
                <div className="flex-1 border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 truncate">
                  {apkFile || 'No file selected'}
                </div>
                <Button
                  variant="outline"
                  className="ml-2"
                  icon={<Folder size={16} />}
                  onClick={handleSelectFile}
                  disabled={installing}
                >
                  Browse
                </Button>
              </div>
            </div>
            
            {installing && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Installing...</span>
                  <span>{installProgress}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${installProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <Button
              variant="primary"
              icon={<Upload size={16} />}
              onClick={handleInstall}
              disabled={installing || !apkFile}
              fullWidth
            >
              {installing ? 'Installing...' : 'Install APK'}
            </Button>
          </div>
        </Card>
        
        <Card title="Installation Options">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  defaultChecked
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Replace existing application
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  defaultChecked
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Grant all requested permissions
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Install to SD card (if supported)
                </span>
              </label>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium mb-2 dark:text-white">Installation Requirements:</h4>
              <ul className="space-y-2">
                {[
                  { text: 'USB debugging enabled', status: true },
                  { text: 'Device connected via ADB', status: true },
                  { text: 'Unknown sources allowed', status: true },
                  { text: 'Sufficient storage space', status: true },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    {item.status ? (
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                <strong>Tip:</strong> Only install APKs from trusted sources. Installing
                applications from unknown sources can pose security risks to your device.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InstallAPK;