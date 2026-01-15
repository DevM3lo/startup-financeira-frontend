'use client';
import { useState } from 'react';
import { Plus, Target, Car, Home, Plane } from 'lucide-react';
import NewGoalModal from '../../../components/NewGoalModal';

const initialGoals = [
  { id: 1, title: 'Reserva de Emergência', current: 5000, target: 15000, icon: Target, color: 'bg-green-500', date: 'Dez 2024' },
  { id: 2, title: 'Trocar de Carro', current: 12000, target: 45000, icon: Car, color: 'bg-blue-600', date: 'Jul 2025' },
  { id: 3, title: 'Viagem de Férias', current: 2000, target: 8000, icon: Plane, color: 'bg-purple-500', date: 'Jan 2025' },
  { id: 4, title: 'Reforma da Casa', current: 500, target: 20000, icon: Home, color: 'bg-orange-500', date: 'Nov 2025' },
];

export default function GoalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState(initialGoals);

  const handleAddGoal = (newGoal) => {
    setGoals([...goals, { ...newGoal, id: Date.now() }]);
  };

  return (
    <div className="space-y-6">
      <NewGoalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddGoal}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">Metas Financeiras</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Acompanhe o progresso dos seus sonhos</p>
        </div>
        <button 
           onClick={() => setIsModalOpen(true)}
           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus size={20} />
          Nova Meta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {goals.map((goal) => {
          const percentage = Math.min((goal.current / goal.target) * 100, 100);
          const IconComponent = goal.icon || Target;
          
          return (
            <div key={goal.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-64 hover:shadow-md transition-all">
              
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${goal.color} bg-opacity-10 dark:bg-opacity-20 text-gray-700`}>
                  <IconComponent size={24} className={`text-${goal.color.replace('bg-', '')} dark:text-white`} /> 
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg transition-colors">{goal.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">Alvo: {goal.date}</p>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">
                    {Math.floor(percentage)}%
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors">
                    R$ {goal.current.toLocaleString('pt-BR')} / {goal.target.toLocaleString('pt-BR')}
                  </span>
                </div>
                
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden transition-colors">
                  <div className={`h-full rounded-full ${goal.color}`} style={{ width: `${percentage}%` }} />
                </div>
              </div>

            </div>
          );
        })}

        {/* Botão de Adicionar (Tracejado) */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl h-64 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 hover:border-green-500 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all group bg-transparent"
        >
          <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-50 dark:group-hover:bg-green-900/30 transition-colors">
            <Plus size={24} />
          </div>
          <span className="font-medium">Criar nova meta</span>
        </button>
      </div>
    </div>
  );
}