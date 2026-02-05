'use client';
import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';


import BalanceChart from '../../components/Charts/BalanceChart';
import CategoryDonut from '../../components/Charts/CategoryDonut';
import TransactionList from '../../components/TransactionList';
import Skeleton from '../../components/Skeleton';
import StatCard from '../../components/StatCard'; 

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-keepBlue dark:text-white transition-colors">Visão Geral</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Resumo financeiro mensal</p>
      </div>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <StatCard 
          title="Saldo Total"
          value="R$ 12.450,00"
          icon={Wallet}
          iconColorClass="bg-blue-100 dark:bg-blue-900/20 text-blue-600"
          isLoading={isLoading}
        />

        <StatCard 
          title="Receitas"
          value="R$ 8.200,00"
          icon={TrendingUp}
          iconColorClass="bg-green-100 dark:bg-green-900/20 text-green-600"
          trend="+12%"
          trendColorClass="text-green-600 bg-green-50 dark:bg-green-900/10"
          isLoading={isLoading}
        />

        <StatCard 
          title="Despesas"
          value="R$ 3.800,00"
          icon={TrendingDown}
          iconColorClass="bg-red-100 dark:bg-red-900/20 text-red-600"
          trend="+5%"
          trendColorClass="text-red-600 bg-red-50 dark:bg-red-900/10"
          isLoading={isLoading}
        />

        <StatCard 
          title="Economia"
          value="R$ 4.400,00"
          icon={PiggyBank}
          iconColorClass="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600"
          isLoading={isLoading}
        />

      </div>

      {/* ÁREA DOS GRÁFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico Principal */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light h-[400px]">
              <div className="flex items-end justify-between h-full gap-2 pb-4">
                 {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} className="w-full rounded-t-md" style={{ height: `${Math.random() * 60 + 20}%` }} />
                 ))}
              </div>
            </div>
          ) : (
            <BalanceChart />
          )}
        </div>

        {/* Gráfico Donut */}
        <div className="lg:col-span-1">
          {isLoading ? (
            <div className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light h-[400px] flex items-center justify-center">
               <Skeleton className="w-48 h-48 rounded-full" />
            </div>
          ) : (
            <CategoryDonut />
          )}
        </div>
      </div>

      {/* LISTA DE TRANSAÇÕES */}
      <div className="w-full">
        {isLoading ? (
          <div className="bg-white dark:bg-keepBlue rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light p-6 space-y-4">
            <Skeleton className="h-6 w-32 mb-4" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center py-2">
                 <div className="flex gap-3 items-center">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1">
                       <Skeleton className="h-4 w-32" />
                       <Skeleton className="h-3 w-20" />
                    </div>
                 </div>
                 <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        ) : (
          <TransactionList />
        )}
      </div>
    </div>
  );
}