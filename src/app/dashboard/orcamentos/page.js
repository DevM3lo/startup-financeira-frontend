'use client';
import { useState } from 'react';
import { Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import NewBudgetModal from '../../../components/NewBudgetModal';

const initialBudgets = [
  { id: 1, category: 'Alimentação', spent: 1250.00, limit: 1500.00, color: 'bg-orange-500' },
  { id: 2, category: 'Moradia', spent: 2200.00, limit: 2200.00, color: 'bg-blue-600' },
  { id: 3, category: 'Lazer', spent: 450.00, limit: 300.00, color: 'bg-purple-500' },
  { id: 4, category: 'Transporte', spent: 320.00, limit: 500.00, color: 'bg-green-500' },
];

export default function BudgetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState(initialBudgets);

  const handleAddBudget = (newBudget) => {
    setBudgets([...budgets, { ...newBudget, id: Date.now() }]);
  };

  return (
    <div className="space-y-6">
      <NewBudgetModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddBudget}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">Orçamentos Mensais</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Controle seus limites de gastos por categoria</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus size={20} />
          Novo Orçamento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
          const isOverBudget = budget.spent > budget.limit;

          return (
            <div key={budget.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-colors">
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white text-lg transition-colors">{budget.category}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                    Gasto: <span className={isOverBudget ? 'text-red-600 dark:text-red-400 font-bold' : 'text-gray-700 dark:text-gray-300'}>
                      R$ {budget.spent.toLocaleString('pt-BR')}
                    </span>
                    {' / '}
                    R$ {budget.limit.toLocaleString('pt-BR')}
                  </p>
                </div>
                {isOverBudget ? (
                  <AlertCircle className="text-red-500" size={24} />
                ) : (
                  <CheckCircle2 className="text-green-500" size={24} />
                )}
              </div>

              {/* Barra de Progresso (Fundo cinza claro no light, cinza escuro no dark) */}
              <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden transition-colors">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${isOverBudget ? 'bg-red-500' : budget.color}`} 
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="mt-2 text-right">
                <span className={`text-xs font-bold ${isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {percentage.toFixed(0)}% do limite
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}