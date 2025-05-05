import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import { FileCode, Upload, AlertTriangle, Folder } from 'lucide-react';

const FlashTools = () => {
  const { addConsoleMessage } = useAppContext();
  const [selectedPartition, setSelectedPartition] = useState('boot');
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [flashing, setFlashing] = useState(false);

  const partitions = [
    { value: 'boot', label: 'Boot' },
    { value: 'recovery', label: 'Recovery' },
    { value: 'system', label: 'System' },
    { value: 'vendor', label: 'Vendor' },
    { value: 'dtbo', label: 'DTBO' },
    { value: 'vbmeta', label: 'VBMeta' },
  ];

  const handleSelectFile = () => {
    // In a real app, this would open a file picker
    // Simulating file selection
    const fileName = 'custom_boot.img';
    setImageFile(fileName);
    addConsoleMessage(`Selected file: ${fileName}`, 'info');
  };

  const handleFlash = () => {
    if (!imageFile) {
      addConsoleMessage('No image file selected', 'error');
      return;
    }

    setFlashing(true);
    addConsoleMessage(`Starting to flash ${imageFile} to ${selectedPartition} partition...`, 'info');
    
    // Simulate the flashing process
    setTimeout(() => {
      addConsoleMessage('Verifying image file...', 'info');
    }, 1000);
    
    setTimeout(() => {
      addConsoleMessage('Image verified successfully', 'success');
    }, 2000);
    
    setTimeout(() => {
      addConsoleMessage(`Flashing ${selectedPartition} partition...`, 'info');
    }, 3000);
    
    setTimeout(() => {
      addConsoleMessage('Flash completed successfully', 'success');
      setFlashing(false);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">Flash Tools</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Flash Image to Partition">
          <div className="space-y-4">
            <div className="flex items-start mb-4">
              <div className="mr-3 mt-1">
                <FileCode className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Flash Image File</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Flash a custom image file to a specific partition on your device. Device must be in Fastboot mode.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Partition
              </label>
              <select
                value={selectedPartition}
                onChange={(e) => setSelectedPartition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {partitions.map((partition) => (
                  <option key={partition.value} value={partition.value}>
                    {partition.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image File
              </label>
              <div className="flex items-center">
                <div className="flex-1 border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 truncate">
                  {imageFile || 'No file selected'}
                </div>
                <Button
                  variant="outline"
                  className="ml-2"
                  icon={<Folder size={16} />}
                  onClick={handleSelectFile}
                >
                  Browse
                </Button>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Flashing the wrong image or to the wrong partition can brick your device. 
                    Proceed with caution.
                  </p>
                </div>
              </div>
            </div>
            
            <Button
              variant="primary"
              icon={<Upload size={16} />}
              onClick={handleFlash}
              disabled={flashing || !imageFile}
              fullWidth
            >
              {flashing ? 'Flashing...' : 'Flash Image'}
            </Button>
          </div>
        </Card>
        
        <Card title="Flash Requirements & Instructions">
          <div className="space-y-4">
            <h4 className="font-medium dark:text-white">Before Flashing:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>Ensure your device is in Fastboot mode</li>
              <li>Make sure your device battery is above 50%</li>
              <li>Backup any important data before proceeding</li>
              <li>Verify the image is compatible with your device model</li>
              <li>Do not disconnect the device during the flashing process</li>
            </ul>
            
            <h4 className="font-medium mt-4 dark:text-white">Common Partitions:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <span className="font-medium">boot</span>: Kernel & ramdisk
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <span className="font-medium">recovery</span>: Recovery environment
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <span className="font-medium">system</span>: Android OS
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <span className="font-medium">vendor</span>: Device-specific files
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FlashTools;