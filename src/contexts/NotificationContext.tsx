import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from '@/types';
import { alertsData } from '@/data/alertsData';  // 👈 import your sample data

interface NotificationContextType {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  updateAlert: (alert: Alert) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // 🔥 Load initial alerts from alertsData
  useEffect(() => {
    setAlerts(alertsData); // first load
  }, []);

  const addAlert = (alert: Alert) => {
    setAlerts(prev => [alert, ...prev].slice(0, 10)); // keep only latest 10
  };

  const updateAlert = (updated: Alert) => {
    setAlerts(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  return (
    <NotificationContext.Provider value={{ alerts, addAlert, updateAlert }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
};
