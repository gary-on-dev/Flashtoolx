import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import { FileText, RefreshCw, Download, Filter, ArrowDown, Trash2 } from 'lucide-react';

const Logs = () => {
  const { addConsoleMessage } = useAppContext();
  const [logs, setLogs] = useState<{ id: string; message: string; timestamp: Date; type: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [logFilter, setLogFilter] = useState('all');

  // Mock log data
  const generateMockLogs = () => {
    const logTypes = ['info', 'warning', 'error', 'debug'];
    const mockMessages = [
      'Device connected via USB',
      'Starting ADB server',
      'Device authorized',
      'Reading device information',
      'Failed to access secure storage',
      'Permission denied: WRITE_SECURE_SETTINGS',
      'Reading system partition',
      'Detected Android version 13',
      'Bootloader status: locked',
      'Device disconnected',
      'USB debugging enabled',
      'Starting recovery sequence',
      'Memory test completed',
      'Storage scan initiated',
      'APK verification started',
      'Running diagnostics',
    ];
    
    const newLogs = [];
    
    // Generate random logs with timestamps going back in time
    const now = new Date();
    for (let i = 0; i < 50; i++) {
      const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
      const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      const timestamp = new Date(now.getTime() - (i * 60000 * Math.random() * 10));
      
      newLogs.push({
        id: `log-${i}`,
        message: randomMessage,
        timestamp,
        type: randomType,
      });
    }
    
    // Sort by timestamp, newest first
    return newLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  useEffect(() => {
    setLoading(true);
    addConsoleMessage('Loading device logs...', 'info');
    
    // Simulate loading delay
    setTimeout(() => {
      const mockLogs = generateMockLogs();
      setLogs(mockLogs);
      setLoading(false);
      addConsoleMessage('Device logs loaded successfully', 'success');
    }, 1500);
  }, [addConsoleMessage]);

  const refreshLogs = () => {
    setLoading(true);
    addConsoleMessage('Refreshing device logs...', 'info');
    
    setTimeout(() => {
      const mockLogs = generateMockLogs();
      setLogs(mockLogs);
      setLoading(false);
      addConsoleMessage('Device logs refreshed', 'success');
    }, 1000);
  };

  const clearLogs = () => {
    setLogs([]);
    addConsoleMessage('Logs cleared', 'info');
  };

  const filteredLogs = logFilter === 'all' 
    ? logs 
    : logs.filter(log => log.type === logFilter);

  const getLogColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'text-red-500 border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'warning':
        return 'text-yellow-500 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'info':
        return 'text-blue-500 border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'debug':
        return 'text-gray-500 border-gray-500 bg-gray-50 dark:bg-gray-800';
      default:
        return 'text-gray-500 border-gray-500 bg-gray-50 dark:bg-gray-800';
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString([], {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Device Logs</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <select
              value={logFilter}
              onChange={(e) => setLogFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Logs</option>
              <option value="info">Info</option>
              <option value="warning">Warnings</option>
              <option value="error">Errors</option>
              <option value="debug">Debug</option>
            </select>
            <Filter className="h-4 w-4 text-gray-500 absolute right-2.5 top-2.5" />
          </div>
          <Button
            variant="outline"
            icon={<RefreshCw size={16} className={loading ? 'animate-spin' : ''} />}
            onClick={refreshLogs}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            icon={<Download size={16} />}
          >
            Export
          </Button>
          <Button
            variant="outline"
            icon={<Trash2 size={16} />}
            onClick={clearLogs}
          >
            Clear
          </Button>
        </div>
      </div>
      
      <Card className="p-0">
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-purple-500 mr-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">Device Log History</h3>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {filteredLogs.length} entries 
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[600px]">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <RefreshCw size={24} className="animate-spin mx-auto text-purple-500 mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Loading logs...</p>
              </div>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <FileText size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500 dark:text-gray-400">No logs found</p>
              </div>
            </div>
          ) : (
            <div className="divide-y dark:divide-gray-700">
              {filteredLogs.map((log) => (
                <div key={log.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start">
                    <div className="mr-3">
                      <span className={`inline-block px-2 py-1 text-xs font-medium uppercase rounded border ${getLogColor(log.type)}`}>
                        {log.type}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">{log.message}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatTimestamp(log.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {filteredLogs.length > 10 && (
          <div className="p-3 border-t dark:border-gray-700 text-center">
            <Button
              variant="outline"
              size="small"
              icon={<ArrowDown size={16} />}
              onClick={() => {
                const element = document.querySelector('.max-h-\\[600px\\]');
                if (element) {
                  element.scrollTop = element.scrollHeight;
                }
              }}
            >
              Scroll to Bottom
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Logs;