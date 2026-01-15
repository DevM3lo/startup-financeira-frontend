'use client';
import { useState } from 'react';
import { Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import NewBudgetModal from '../../../components/NewBudgetModal'; // <--- Importe o Modal

const initialBudgets = [
  { id: 1, category: 'Alimentação', spent: 1250.00, limit: 1500.00, color: 'bg-orange-500' },
  { id: 2, category: 'Moradia', spent: 2200.00, limit: 2200.00, color: 'bg-blue-600' },
];

export default function BudgetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState(initialBudgets); // Estado da lista

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
          <h1 className="text-2xl font-bold text-gray-800">Orçamentos Mensais</h1>
          <p className="text-gray-500 text-sm">Controle seus limites de gastos</p>
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
            <div key={budget.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{budget.category}</h3>
                  <p className="text-sm text-gray-500">
                    Gasto: <span className={isOverBudget ? 'text-red-600 font-bold' : 'text-gray-700'}>
                      R$ {budget.spent.toLocaleString('pt-BR')}
                    </span>
                    {' / '}
                    R$ {budget.limit.toLocaleString('pt-BR')}
                  </p>
                </div>
                {isOverBudget ? <AlertCircle className="text-red-500" size={24} /> : <CheckCircle2 className="text-green-500" size={24} />}
              </div>

              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${isOverBudget ? 'bg-red-500' : budget.color}`} 
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="mt-2 text-right">
                <span className={`text-xs font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-500'}`}>
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