'use client';
import { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function NewTransactionModal({ isOpen, onClose, onSave }) {
  // 1. Estados para guardar o que o usuário digita
  const [type, setType] = useState('expense'); // 'income' ou 'expense'
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Alimentação');
  const [date, setDate] = useState('');

  if (!isOpen) return null;

  // 2. Função que roda quando clica em SALVAR
  const handleSubmit = (e) => {
    e.preventDefault(); // Não deixa a página recarregar

    // Cria o objeto da nova transação
    const newTransaction = {
      description,
      amount: parseFloat(amount), // Converte texto pra número
      category,
      date, // Vamos formatar isso lá na lista
      type,
      status: 'Concluído' // Padrão
    };

    // Manda pro pai (a página de transações)
    onSave(newTransaction);
    
    // Limpa o form e fecha
    setDescription('');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Cabeçalho */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h3 className="font-bold text-lg text-gray-800">Nova Transação</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Tipo (Botões de Seleção) */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`border rounded-xl p-3 font-medium transition-all ${
                type === 'expense' 
                  ? 'border-red-500 bg-red-50 text-red-600' 
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`border rounded-xl p-3 font-medium transition-all ${
                type === 'income' 
                  ? 'border-green-500 bg-green-50 text-green-600' 
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Receita
            </button>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <input 
              required
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Almoço, Freela..." 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
            />
          </div>

          {/* Valor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
            <input 
              required
              type="number" 
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00" 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
            />
          </div>

          {/* Categoria e Data */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
              >
                <option>Alimentação</option>
                <option>Transporte</option>
                <option>Lazer</option>
                <option>Salário</option>
                <option>Moradia</option>
                <option>Outros</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
              <input 
                required
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
              />
            </div>
          </div>

          {/* Botões */}
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
              <Check size={18} />
              Salvar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}