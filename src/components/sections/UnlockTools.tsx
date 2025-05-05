import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import { Unlock, Key, AlertTriangle, Check } from 'lucide-react';

const UnlockTools = () => {
  const { addConsoleMessage } = useAppContext();
  const [unlocking, setUnlocking] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const handleUnlock = () => {
    setConfirmDialog(true);
  };

  const confirmUnlock = () => {
    setUnlocking(true);
    addConsoleMessage('Starting pattern lock removal process...', 'info');
    
    // Simulate the unlock process
    setTimeout(() => {
      addConsoleMessage('Checking device root status...', 'info');
    }, 500);
    
    setTimeout(() => {
      addConsoleMessage('Root access verified', 'success');
    }, 1500);
    
    setTimeout(() => {
      addConsoleMessage('Removing gesture.key file...', 'info');
    }, 2500);
    
    setTimeout(() => {
      addConsoleMessage('Removing locksettings.db...', 'info');
    }, 3500);
    
    setTimeout(() => {
      addConsoleMessage('Lock files successfully removed', 'success');
    }, 4500);
    
    setTimeout(() => {
      addConsoleMessage('Rebooting device...', 'info');
    }, 5500);
    
    setTimeout(() => {
      addConsoleMessage('Device rebooted successfully. Pattern lock removed!', 'success');
      setUnlocking(false);
      setConfirmDialog(false);
    }, 7000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">Unlock Tools</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Pattern Lock Removal">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <Key className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Remove Pattern Lock</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Removes the pattern lock screen from your Android device. This operation requires root access
                  or custom recovery.
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    This action will remove security from your device and may cause data loss. Use with caution.
                  </p>
                </div>
              </div>
            </div>
            
            <Button
              variant="primary"
              icon={<Unlock size={16} />}
              onClick={handleUnlock}
              disabled={unlocking}
              fullWidth
            >
              {unlocking ? 'Unlocking...' : 'Remove Pattern Lock'}
            </Button>
          </div>
        </Card>
        
        <Card title="Requirements">
          <div className="space-y-3">
            <h4 className="font-medium dark:text-white">For Pattern Lock Removal:</h4>
            <ul className="space-y-2">
              {[
                'Device must be rooted or have custom recovery installed',
                'USB debugging must be enabled',
                'ADB connection must be established',
                'Device battery should be above 50%',
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                <strong>Note:</strong> This tool should only be used on your own devices or with
                explicit permission from the device owner. Using this tool to gain unauthorized
                access to devices is illegal.
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Confirmation Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Confirm Unlock</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to remove the pattern lock? This process cannot be undone and may result in
              data loss if not properly executed.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setConfirmDialog(false)} fullWidth>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmUnlock} disabled={unlocking} fullWidth>
                {unlocking ? 'Processing...' : 'Yes, Remove Lock'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnlockTools;