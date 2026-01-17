'use client';
import { useState, useEffect, useRef } from 'react';
import { X, Palette, Target, Car, Home, Plane, Smartphone, GraduationCap, Gift, Wallet } from 'lucide-react';

export default function NewGoalModal({ isOpen, onClose, onSave, initialData }) {
  const [title, setTitle] = useState('');
  const [current, setCurrent] = useState('');
  const [target, setTarget] = useState('');
  const [date, setDate] = useState('');
  const [color, setColor] = useState('#2563eb');
  const [iconName, setIconName] = useState('Target');

  const colorInputRef = useRef(null);

  // Mapeamento de Ícones disponíveis para escolha
  const iconOptions = [
    { name: 'Target', label: 'Alvo', component: Target },
    { name: 'Car', label: 'Carro', component: Car },
    { name: 'Home', label: 'Casa', component: Home },
    { name: 'Plane', label: 'Viagem', component: Plane },
    { name: 'Smartphone', label: 'Eletrônico', component: Smartphone },
    { name: 'GraduationCap', label: 'Estudo', component: GraduationCap },
    { name: 'Gift', label: 'Presente', component: Gift },
    { name: 'Wallet', label: 'Reserva', component: Wallet },
  ];

  const colorOptions = [
    { value: '#2563eb' }, // Azul
    { value: '#22c55e' }, // Verde
    { value: '#a855f7' }, // Roxo
    { value: '#f97316' }, // Laranja
    { value: '#ef4444' }, // Vermelho
    { value: '#ec4899' }, // Rosa
  ];

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCurrent(initialData.current.toString());
      setTarget(initialData.target.toString());
      setDate(initialData.date);
      setColor(initialData.color);
      setIconName(initialData.iconName || 'Target');
    } else {
      setTitle('');
      setCurrent('');
      setTarget('');
      setDate('');
      setColor('#2563eb');
      setIconName('Target');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: initialData?.id,
      title,
      current: parseFloat(current),
      target: parseFloat(target),
      date,
      color,
      iconName,
      completed: initialData?.completed || false // Mantém o status se já existir
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity">
      <div className="bg-white dark:bg-keepBlue w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100 dark:border-keepBlue-light">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-keepBlue-light bg-gray-50 dark:bg-keepBlue-dark">
          <h2 className="text-xl font-bold text-keepBlue dark:text-white">
            {initialData ? 'Editar Meta' : 'Nova Meta'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título da Meta</label>
            <input 
              required
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white"
              placeholder="Ex: Reserva de Emergência" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valor Atual (R$)</label>
              <input 
                type="number" 
                step="0.01"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white"
                placeholder="0,00" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alvo Final (R$)</label>
              <input 
                required
                type="number" 
                step="0.01"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white"
                placeholder="10000,00" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prazo (Texto ou Data)</label>
            <input 
              required
              type="text" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white"
              placeholder="Ex: Dezembro 2025" 
            />
          </div>

          {/* Seletor de Ícones */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ícone</label>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              {iconOptions.map((opt) => {
                const Icon = opt.component;
                const isSelected = iconName === opt.name;
                return (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setIconName(opt.name)}
                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                      isSelected 
                        ? 'bg-coinGold text-keepBlue border-coinGold ring-2 ring-offset-1 ring-coinGold' 
                        : 'bg-gray-50 dark:bg-keepBlue-dark border-gray-200 dark:border-keepBlue-light text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    title={opt.label}
                  >
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Seletor de Cores */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cor do Tema</label>
            <div className="flex gap-3 flex-wrap items-center">
              {colorOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setColor(opt.value)}
                  style={{ backgroundColor: opt.value }}
                  className={`w-8 h-8 rounded-full transition-transform hover:scale-110 border border-gray-200 dark:border-gray-700 ${
                    color === opt.value ? 'ring-2 ring-offset-2 ring-coinGold dark:ring-offset-keepBlue' : ''
                  }`}
                />
              ))}
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-2"></div>
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => colorInputRef.current?.click()}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 via-green-500 to-blue-500 flex items-center justify-center hover:scale-110 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
                >
                  <Palette size={14} className="text-white drop-shadow-md" />
                </button>
                <input 
                  ref={colorInputRef}
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="absolute opacity-0 w-0 h-0 pointer-events-none"
                />
              </div>
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