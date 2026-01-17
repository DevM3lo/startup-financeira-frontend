'use client';
import { useState, useEffect, useRef } from 'react';
import { X, Palette } from 'lucide-react';

export default function NewBudgetModal({ isOpen, onClose, onSave, initialData }) {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [spent, setSpent] = useState('');
  // Agora o estado inicial é um HEX (Azul padrão)
  const [color, setColor] = useState('#2563eb');
  
  // Ref para acionar o input de cor escondido
  const colorInputRef = useRef(null);

  // Cores pré-definidas agora em HEX para facilitar
  const colorOptions = [
    { name: 'Azul', value: '#2563eb' },
    { name: 'Verde', value: '#22c55e' },
    { name: 'Roxo', value: '#a855f7' },
    { name: 'Laranja', value: '#f97316' },
    { name: 'Vermelho', value: '#ef4444' },
    { name: 'Rosa', value: '#ec4899' },
  ];

  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category);
      setLimit(initialData.limit.toString());
      setSpent(initialData.spent.toString());
      setColor(initialData.color); // Carrega a cor salva (seja preset ou custom)
    } else {
      setCategory('');
      setLimit('');
      setSpent('0');
      setColor('#2563eb');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: initialData?.id,
      category,
      limit: parseFloat(limit),
      spent: parseFloat(spent),
      color // Envia o código HEX
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity">
      <div className="bg-white dark:bg-keepBlue w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100 dark:border-keepBlue-light">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-keepBlue-light bg-gray-50 dark:bg-keepBlue-dark">
          <h2 className="text-xl font-bold text-keepBlue dark:text-white">
            {initialData ? 'Editar Orçamento' : 'Novo Orçamento'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
            <input 
              required
              type="text" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white"
              placeholder="Ex: Viagens, Mercado..." 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Limite (R$)</label>
              <input 
                required
                type="number" 
                step="0.01"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white"
                placeholder="1000,00" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gasto Atual (R$)</label>
              <input 
                type="number" 
                step="0.01"
                value={spent}
                onChange={(e) => setSpent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white"
                placeholder="0,00" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cor do Card</label>
            <div className="flex gap-3 flex-wrap items-center">
              
              {/* Opções Pré-definidas */}
              {colorOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setColor(opt.value)}
                  // Aplica a cor via style inline
                  style={{ backgroundColor: opt.value }}
                  className={`w-8 h-8 rounded-full transition-transform hover:scale-110 border border-gray-200 dark:border-gray-700 ${
                    color === opt.value ? 'ring-2 ring-offset-2 ring-coinGold dark:ring-offset-keepBlue' : ''
                  }`}
                  title={opt.name}
                />
              ))}

              {/* Divisória */}
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-2"></div>

              {/* Botão Color Picker Personalizado */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => colorInputRef.current?.click()}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 via-green-500 to-blue-500 flex items-center justify-center hover:scale-110 transition-transform shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
                  title="Escolher outra cor"
                >
                  <Palette size={14} className="text-white drop-shadow-md" />
                </button>
                
                {/* Input nativo escondido */}
                <input 
                  ref={colorInputRef}
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="absolute opacity-0 w-0 h-0 pointer-events-none"
                />
              </div>

              {/* Mostra a cor selecionada atualmente se for personalizada */}
              {!colorOptions.some(c => c.value === color) && (
                <div 
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-keepBlue shadow-sm ring-2 ring-coinGold ml-1"
                  style={{ backgroundColor: color }}
                  title="Cor personalizada selecionada"
                />
              )}

            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-keepBlue-dark font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-2 bg-coinGold hover:bg-yellow-500 text-keepBlue rounded-lg font-bold shadow-md transition-colors"
            >
              Salvar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}