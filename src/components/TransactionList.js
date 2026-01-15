'use client';
import { ShoppingBag, ArrowUpRight, ArrowDownLeft, Coffee, Home } from 'lucide-react';

const transactions = [
  { id: 1, title: 'Supermercado Extra', date: 'Hoje, 10:30', amount: -450.00, type: 'expense', icon: ShoppingBag, category: 'Alimentação' },
  { id: 2, title: 'Salário Mensal', date: 'Ontem, 08:00', amount: 4200.00, type: 'income', icon: ArrowUpRight, category: 'Salário' },
  { id: 3, title: 'Netflix', date: '12 Jan, 14:00', amount: -55.90, type: 'expense', icon: Coffee, category: 'Lazer' },
  { id: 4, title: 'Aluguel', date: '10 Jan, 09:00', amount: -1200.00, type: 'expense', icon: Home, category: 'Moradia' },
];

export default function TransactionList() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Transações Recentes</h3>
        <button className="text-sm text-green-600 font-medium hover:underline">Ver todas</button>
      </div>

      <div className="space-y-4">
        {transactions.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
            <div className="flex items-center gap-4">
              {/* Ícone */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                item.type === 'income' 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                <item.icon size={20} />
              </div>
              
              {/* Texto */}
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-100">{item.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.category} • {item.date}</p>
              </div>
            </div>

            {/* Valor */}
            <span className={`font-bold ${item.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {item.type === 'income' ? '+' : ''} {item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}