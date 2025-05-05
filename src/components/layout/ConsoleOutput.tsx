import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Trash2 } from 'lucide-react';
import Button from '../ui/Button';

const ConsoleOutput = () => {
  const { consoleMessages, clearConsoleMessages } = useAppContext();
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleMessages]);

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      default:
        return 'text-gray-300';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="bg-gray-900 rounded-lg text-white h-64 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <h3 className="font-medium">Console Output</h3>
        <Button 
          variant="outline" 
          size="small" 
          onClick={clearConsoleMessages}
          icon={<Trash2 size={16} />} 
          className="dark:text-gray-400 dark:hover:bg-gray-700"
        >
          Clear
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        {consoleMessages.length === 0 ? (
          <div className="text-gray-500 italic h-full flex items-center justify-center">
            Console output will appear here
          </div>
        ) : (
          <div>
            {consoleMessages.map((msg) => (
              <div key={msg.id} className="mb-1">
                <span className="text-gray-500">[{formatTime(msg.timestamp)}]</span>{' '}
                <span className={getMessageColor(msg.type)}>{msg.message}</span>
              </div>
            ))}
            <div ref={consoleEndRef}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsoleOutput;