import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { AppSection } from '../../types';
import { 
  Home, 
  Smartphone, 
  Unlock, 
  FileCode, 
  HardDrive, 
  Package, 
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const { activeSection, setActiveSection, isDeviceConnected } = useAppContext();
  const [collapsed, setCollapsed] = React.useState(false);

  const menuItems: { id: AppSection; label: string; icon: React.ReactNode; requiresDevice?: boolean }[] = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'device-info', label: 'Device Info', icon: <Smartphone size={20} />, requiresDevice: true },
    { id: 'unlock-tools', label: 'Unlock Tools', icon: <Unlock size={20} />, requiresDevice: true },
    { id: 'flash-tools', label: 'Flash Tools', icon: <FileCode size={20} />, requiresDevice: true },
    { id: 'storage-health', label: 'Storage Health', icon: <HardDrive size={20} />, requiresDevice: true },
    { id: 'install-apk', label: 'Install APK', icon: <Package size={20} />, requiresDevice: true },
    { id: 'logs', label: 'Logs', icon: <FileText size={20} /> },
  ];

  return (
    <div 
      className={`h-full bg-gray-900 text-white transition-all duration-300 flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!collapsed && <h2 className="text-xl font-bold">FlashLab</h2>}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-800 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isDisabled = item.requiresDevice && !isDeviceConnected;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => !isDisabled && setActiveSection(item.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-purple-700 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  disabled={isDisabled}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
        {!collapsed && <p>FlashLab Pro v1.0</p>}
      </div>
    </div>
  );
};

export default Sidebar;