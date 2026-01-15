'use client';
import { useState } from 'react';
import { X, Check, Target } from 'lucide-react';

export default function NewGoalModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [date, setDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      target: parseFloat(target),
      current: 0, // Começa com R$ 0,00
      date, // Data em texto mesmo por enquanto
      icon: Target, // Ícone padrão
      color: 'bg-green-500' 
    });
    setTitle('');
    setTarget('');
    setDate('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-2xl">
          <h3 className="font-bold text-gray-800">Nova Meta</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Meta</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Viagem Disney"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor Alvo (R$)</label>
            <input 
              required
              type="number" 
              placeholder="10000,00"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prazo</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Dez 2025"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
            />
          </div>

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2">
            <Check size={18} /> Criar Meta
          </button>
        </form>
      </div>
    </div>
  );
}