'use client';
import { useState } from 'react';
import { Plus, Target, Car, Home, Plane, Smartphone, GraduationCap, Gift, Wallet, MoreHorizontal, Edit2, Trash2, CheckSquare, RotateCcw } from 'lucide-react';
import NewGoalModal from '../../../components/NewGoalModal';
import { useToast } from '../../../providers/ToastProvider'; 


const iconMap = {
  Target, Car, Home, Plane, Smartphone, GraduationCap, Gift, Wallet
};


const initialGoals = [
  { id: 1, title: 'Reserva de Emergência', current: 5000, target: 15000, iconName: 'Target', color: '#22c55e', date: 'Dez 2024', completed: false },
  { id: 2, title: 'Trocar de Carro', current: 12000, target: 45000, iconName: 'Car', color: '#2563eb', date: 'Jul 2025', completed: false },
  { id: 3, title: 'Viagem de Férias', current: 2000, target: 8000, iconName: 'Plane', color: '#a855f7', date: 'Jan 2025', completed: false },
  { id: 4, title: 'Reforma da Casa', current: 500, target: 20000, iconName: 'Home', color: '#f97316', date: 'Nov 2025', completed: false },
];

export default function GoalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState(initialGoals);
  
 
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);

  
  const { addToast } = useToast();

  const handleSaveGoal = (goalData) => {
    if (goalData.id) {
      setGoals((prev) => prev.map((g) => (g.id === goalData.id ? goalData : g)));
      
      addToast({ type: 'success', message: 'Meta atualizada com sucesso!' });
    } else {
      const newGoal = { ...goalData, id: Date.now() };
      setGoals([...goals, newGoal]);
      
      addToast({ type: 'success', message: 'Nova meta criada!' });
    }
    setIsModalOpen(false);
    setEditingGoal(null);
  };

  const handleDelete = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
    setActiveMenuId(null);
    
    addToast({ type: 'info', message: 'Meta removida.' });
  };

  const handleToggleComplete = (goal) => {
    const updatedGoal = { ...goal, completed: !goal.completed };
    setGoals((prev) => prev.map((g) => (g.id === goal.id ? updatedGoal : g)));
    setActiveMenuId(null);

    
    if (updatedGoal.completed) {
      addToast({ type: 'success', message: 'Parabéns! Meta concluída! 🚀' });
    } else {
      addToast({ type: 'info', message: 'Meta reaberta.' });
    }
  };

  const handleOpenEdit = (goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const handleOpenNew = () => {
    setEditingGoal(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6" onClick={() => setActiveMenuId(null)}>
      <NewGoalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGoal}
        initialData={editingGoal}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-keepBlue dark:text-white transition-colors">Metas Financeiras</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Acompanhe o progresso dos seus sonhos</p>
        </div>
        <button 
           onClick={(e) => { e.stopPropagation(); handleOpenNew(); }}
           className="bg-coinGold hover:bg-yellow-500 text-keepBlue px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-lg shadow-yellow-500/20 transition-all"
        >
          <Plus size={20} />
          Nova Meta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {goals.map((goal) => {
          
          const percentage = goal.completed ? 100 : Math.min((goal.current / goal.target) * 100, 100);
          const IconComponent = iconMap[goal.iconName] || Target;
          
          return (
            <div 
              key={goal.id} 
              className={`bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light flex flex-col justify-between h-64 hover:shadow-md transition-all relative group ${goal.completed ? 'opacity-80' : ''}`}
            >
              {/* Botão de Menu (3 pontinhos) - Posicionado no topo direito */}
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === goal.id ? null : goal.id); }}
                  className="text-gray-300 hover:text-keepBlue dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-keepBlue-dark transition-colors"
                >
                  <MoreHorizontal size={20} />
                </button>

                {activeMenuId === goal.id && (
                  <div className="absolute right-0 top-8 w-48 bg-white dark:bg-keepBlue rounded-xl shadow-xl border border-gray-100 dark:border-keepBlue-light py-2 animate-in fade-in zoom-in duration-200 z-20">
                    
                    {/* Botão de Concluir / Reabrir */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleToggleComplete(goal); }}
                      className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-keepBlue-dark ${goal.completed ? 'text-orange-500' : 'text-green-600'}`}
                    >
                      {goal.completed ? <RotateCcw size={16} /> : <CheckSquare size={16} />}
                      {goal.completed ? 'Reabrir Meta' : 'Concluir Meta'}
                    </button>

                    <button 
                      onClick={(e) => { e.stopPropagation(); handleOpenEdit(goal); }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-keepBlue-dark flex items-center gap-2"
                    >
                      <Edit2 size={16} /> Editar
                    </button>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(goal.id); }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                    >
                      <Trash2 size={16} /> Excluir
                    </button>
                  </div>
                )}
              </div>

              <div>
                {/* Ícone com fundo colorido */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={{ backgroundColor: `${goal.color}20` }} // 20% de opacidade no HEX
                >
                  <IconComponent size={24} style={{ color: goal.completed ? '#22c55e' : goal.color }} /> 
                </div>
                
                <h3 className="font-bold text-keepBlue dark:text-white text-lg transition-colors pr-6">
                  {goal.title}
                </h3>
                
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">Alvo: {goal.date}</p>
                  {goal.completed && (
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase">
                      Concluída
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className={`text-2xl font-bold transition-colors ${goal.completed ? 'text-green-500' : 'text-keepBlue dark:text-white'}`}>
                    {Math.floor(percentage)}%
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors">
                    R$ {goal.current.toLocaleString('pt-BR')}
                  </span>
                </div>
                
                {/* Barra de Progresso */}
                <div className="w-full h-2 bg-gray-100 dark:bg-keepBlue-dark rounded-full overflow-hidden transition-colors">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: goal.completed ? '#22c55e' : goal.color 
                    }} 
                  />
                </div>
              </div>

            </div>
          );
        })}

        {/* Botão de Adicionar (Tracejado) */}
        <button 
          onClick={(e) => { e.stopPropagation(); handleOpenNew(); }}
          className="border-2 border-dashed border-gray-200 dark:border-keepBlue-light rounded-xl h-64 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 hover:border-coinGold dark:hover:border-coinGold hover:text-coinGold dark:hover:text-coinGold transition-all group bg-transparent"
        >
          <div className="w-12 h-12 bg-gray-50 dark:bg-keepBlue-dark rounded-full flex items-center justify-center mb-3 group-hover:bg-yellow-50 dark:group-hover:bg-yellow-900/20 transition-colors">
            <Plus size={24} />
          </div>
          <span className="font-medium">Criar nova meta</span>
        </button>
      </div>
    </div>
  );
}