'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'success', message }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {/* Container dos Toasts (Fixo no canto superior direito) */}
      <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2 w-full max-w-sm pointer-events-none p-4 sm:p-0">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`
              pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in slide-in-from-right duration-300
              ${toast.type === 'success' ? 'bg-white dark:bg-keepBlue border-green-500 text-keepBlue dark:text-white' : ''}
              ${toast.type === 'error' ? 'bg-white dark:bg-keepBlue border-red-500 text-keepBlue dark:text-white' : ''}
              ${toast.type === 'info' ? 'bg-white dark:bg-keepBlue border-coinGold text-keepBlue dark:text-white' : ''}
            `}
          >
            {/* Ícone */}
            {toast.type === 'success' && <CheckCircle className="text-green-500" size={20} />}
            {toast.type === 'error' && <AlertCircle className="text-red-500" size={20} />}
            {toast.type === 'info' && <Info className="text-coinGold" size={20} />}
            
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            
            <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}