import { PlusCircle } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon, 
  title, 
  message, 
  actionLabel, 
  onAction 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200 dark:border-keepBlue-light rounded-2xl bg-gray-50/50 dark:bg-keepBlue-dark/30 animate-in fade-in zoom-in duration-300">
      
      <div className="w-16 h-16 bg-gray-100 dark:bg-keepBlue-light rounded-full flex items-center justify-center mb-4 text-gray-400 dark:text-gray-300">
        {Icon ? <Icon size={32} /> : <PlusCircle size={32} />}
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
        {title}
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        {message}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="flex items-center gap-2 px-6 py-2 bg-coinGold hover:bg-yellow-500 text-keepBlue font-bold rounded-lg transition-transform hover:scale-105 shadow-md"
        >
          <PlusCircle size={18} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}