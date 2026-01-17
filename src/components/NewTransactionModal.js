'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function TransactionModal({ isOpen, onClose, onSave, initialData }) {
  // Estados do formulário
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [date, setDate] = useState('');

  // Efeito: Quando o modal abre ou os dados mudam, preenche ou limpa o formulário
  useEffect(() => {
    if (initialData) {
      // MODO EDIÇÃO: Preenche com os dados existentes
      setDescription(initialData.description);
      setAmount(initialData.amount.toString());
      setCategory(initialData.category);
      setType(initialData.type);
      setDate(initialData.date);
    } else {
      // MODO CRIAÇÃO: Limpa tudo
      setDescription('');
      setAmount('');
      setCategory('');
      setType('expense');
      setDate('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: initialData?.id, // Mantém o ID se for edição
      description,
      amount: parseFloat(amount),
      category,
      type,
      date,
      status: 'Concluído' // Padrão
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity">
      <div className="bg-white dark:bg-keepBlue w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100 dark:border-keepBlue-light">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-keepBlue-light bg-gray-50 dark:bg-keepBlue-dark">
          <h2 className="text-xl font-bold text-keepBlue dark:text-white">
            {initialData ? 'Editar Transação' : 'Nova Transação'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Tipo (Receita / Despesa) */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`py-2 rounded-lg font-medium border transition-all ${
                type === 'income'
                  ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'border-gray-200 dark:border-keepBlue-light text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-keepBlue-dark'
              }`}
            >
              Receita
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`py-2 rounded-lg font-medium border transition-all ${
                type === 'expense'
                  ? 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : 'border-gray-200 dark:border-keepBlue-light text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-keepBlue-dark'
              }`}
            >
              Despesa
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
            <input 
              required
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white"
              placeholder="Ex: Salário, Mercado..." 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valor (R$)</label>
              <input 
                required
                type="number" 
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white"
                placeholder="0,00" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data</label>
              <input 
                required
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white"
            >
              <option value="" disabled>Selecione...</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Moradia">Moradia</option>
              <option value="Salário">Salário</option>
              <option value="Lazer">Lazer</option>
              <option value="Transporte">Transporte</option>
              <option value="Venda">Venda</option>
              <option value="Infraestrutura">Infraestrutura</option>
            </select>
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