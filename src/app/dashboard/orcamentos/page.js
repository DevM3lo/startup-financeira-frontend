'use client';
import { useState } from 'react';
import { Plus, AlertCircle, CheckCircle2, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import NewBudgetModal from '../../../components/NewBudgetModal';
import { useToast } from '../../../providers/ToastProvider'; // <--- 1. IMPORTAR O TOAST


const initialBudgets = [
  { id: 1, category: 'Alimentação', spent: 1250.00, limit: 1500.00, color: '#f97316' }, // Laranja
  { id: 2, category: 'Moradia', spent: 2200.00, limit: 2200.00, color: '#2563eb' }, // Azul
  { id: 3, category: 'Lazer', spent: 450.00, limit: 300.00, color: '#a855f7' },   // Roxo
  { id: 4, category: 'Transporte', spent: 320.00, limit: 500.00, color: '#22c55e' }, // Verde
];

export default function BudgetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState(initialBudgets);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editingBudget, setEditingBudget] = useState(null);
  
 
  const { addToast } = useToast();

  const handleSaveBudget = (budgetData) => {
    if (budgetData.id) {
      setBudgets((prev) => 
        prev.map((b) => (b.id === budgetData.id ? budgetData : b))
      );
      
      addToast({ type: 'success', message: 'Orçamento atualizado com sucesso!' });
    } else {
      const newBudget = { ...budgetData, id: Date.now() };
      setBudgets([...budgets, newBudget]);
      
      addToast({ type: 'success', message: 'Novo orçamento criado!' });
    }
    setIsModalOpen(false);
    setEditingBudget(null);
  };

  const handleDelete = (id) => {
    setBudgets(budgets.filter((b) => b.id !== id));
    setActiveMenuId(null);
    
    addToast({ type: 'info', message: 'Orçamento removido.' });
  };

  const handleOpenEdit = (budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const handleOpenNew = () => {
    setEditingBudget(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6" onClick={() => setActiveMenuId(null)}>
      
      <NewBudgetModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBudget}
        initialData={editingBudget}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-keepBlue dark:text-white transition-colors">Orçamentos Mensais</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Controle seus limites de gastos</p>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); handleOpenNew(); }}
          className="bg-coinGold hover:bg-yellow-500 text-keepBlue px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-lg shadow-yellow-500/20 transition-all"
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
            <div key={budget.id} className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light relative overflow-visible transition-colors group">
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-keepBlue dark:text-white text-lg transition-colors">{budget.category}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                    <span className={isOverBudget ? 'text-red-500 font-bold' : 'text-gray-700 dark:text-gray-300'}>
                      R$ {budget.spent.toLocaleString('pt-BR')}
                    </span>
                    {' / '}
                    R$ {budget.limit.toLocaleString('pt-BR')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {isOverBudget ? (
                    <AlertCircle className="text-red-500" size={24} />
                  ) : (
                    <CheckCircle2 className="text-green-500" size={24} />
                  )}

                  <div className="relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === budget.id ? null : budget.id); }}
                      className="text-gray-300 hover:text-keepBlue dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-keepBlue-dark transition-colors"
                    >
                      <MoreHorizontal size={20} />
                    </button>

                    {activeMenuId === budget.id && (
                      <div className="absolute right-0 top-8 z-50 w-40 bg-white dark:bg-keepBlue rounded-xl shadow-xl border border-gray-100 dark:border-keepBlue-light py-2 animate-in fade-in zoom-in duration-200">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleOpenEdit(budget); }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-keepBlue-dark flex items-center gap-2"
                        >
                          <Edit2 size={16} /> Editar
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDelete(budget.id); }}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                        >
                          <Trash2 size={16} /> Excluir
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="w-full h-3 bg-gray-100 dark:bg-keepBlue-dark rounded-full overflow-hidden transition-colors">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: isOverBudget ? '#ef4444' : budget.color 
                  }}
                />
              </div>

              <div className="mt-2 text-right">
                <span className={`text-xs font-bold ${isOverBudget ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  {percentage.toFixed(0)}% consumido
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}