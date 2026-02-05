'use client';
import { MoreHorizontal } from 'lucide-react';
import Skeleton from './Skeleton';

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  iconColorClass, 
  trend,          
  trendColorClass,
  isLoading 
}) {
  return (
    <div className="bg-white dark:bg-keepBlue p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-keepBlue-light transition-colors hover:shadow-md">
      
      {/* Cabeçalho do Card (Ícone e Trend/Menu) */}
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${iconColorClass}`}>
          {Icon && <Icon size={24} />}
        </div>
        
        {trend ? (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${trendColorClass}`}>
            {trend}
          </span>
        ) : (
          <button className="text-gray-400 hover:text-keepBlue dark:hover:text-white transition-colors">
            <MoreHorizontal size={20} />
          </button>
        )}
      </div>

      {/* Corpo do Card (Loading ou Conteúdo) */}
      {isLoading ? (
        <div className="space-y-2 animate-in fade-in">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-36" />
        </div>
      ) : (
        <div className="animate-in slide-in-from-bottom-2 duration-300">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-keepBlue dark:text-white mt-1">
            {value}
          </h3>
        </div>
      )}
    </div>
  );
}