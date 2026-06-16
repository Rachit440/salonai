import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast: React.FC<{ message: string; type: string; onClose: () => void }> = ({ message, type, onClose }) => {
  const icons = { success: <CheckCircle className="w-5 h-5 text-green-500" />, error: <AlertCircle className="w-5 h-5 text-red-500" />, info: <Info className="w-5 h-5 text-blue-500" /> };
  const bg = { success: 'bg-green-50', error: 'bg-red-50', info: 'bg-blue-50' };
  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${bg[type as keyof typeof bg]}`}>
      {icons[type as keyof typeof icons]}
      <span className="text-sm font-medium text-gray-800">{message}</span>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
    </div>
  );
};

export default Toast;
