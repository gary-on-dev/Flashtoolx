export interface DeviceInfo {
  model: string;
  androidVersion: string;
  bootloaderStatus: 'locked' | 'unlocked' | 'unknown';
  serialNumber: string;
  connectionType: 'adb' | 'fastboot' | 'disconnected';
}

export interface ConsoleMessage {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  timestamp: Date;
}

export type AppSection = 
  | 'home' 
  | 'device-info' 
  | 'unlock-tools' 
  | 'flash-tools' 
  | 'storage-health' 
  | 'install-apk' 
  | 'logs';