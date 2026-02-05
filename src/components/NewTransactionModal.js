'use client';
import { useState, useEffect } from 'react';
import { X, Repeat } from 'lucide-react';
import CurrencyInput from './CurrencyInput'; 

export default function NewTransactionModal({ isOpen, onClose, onSave, initialData }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(''); 
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [date, setDate] = useState('');
  
  
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('monthly');

  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description);
      setAmount(initialData.amount); 
      setCategory(initialData.category);
      setType(initialData.type);
      setDate(initialData.date);
      
      setIsRecurring(initialData.isRecurring || false);
      setFrequency(initialData.frequency || 'monthly');
    } else {
      setDescription('');
      setAmount('');
      setCategory('');
      setType('expense');
      setDate('');
      setIsRecurring(false);
      setFrequency('monthly');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: initialData?.id,
      description,
      amount: Number(amount), 
      category,
      type,
      date,
     
      status: 'Pendente', 
      isRecurring,
      frequency: isRecurring ? frequency : null
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity">
      <div className="bg-white dark:bg-keepBlue w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100 dark:border-keepBlue-light">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-keepBlue-light bg-gray-50 dark:bg-keepBlue-dark">
          <h2 className="text-xl font-bold text-keepBlue dark:text-white">
            {initialData ? 'Editar Transação' : 'Nova Transação'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Tipo */}
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
              className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white transition-colors"
              placeholder="Ex: Salário, Mercado..." 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valor</label>
              
              
              <CurrencyInput 
                value={amount}
                onChange={(val) => setAmount(val)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:outline-none focus:ring-2 focus:ring-coinGold bg-white dark:bg-keepBlue-dark text-gray-900 dark:text-white transition-colors"
                placeholder="R$ 0,00"
              />

            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data</label>
              <input 
                required
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white transition-colors"
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

          {/* CHECKBOX DE RECORRÊNCIA */}
          <div className="pt-2 border-t border-gray-100 dark:border-keepBlue-light">
             <div className="flex items-center gap-3 mb-2">
                <input 
                  type="checkbox" 
                  id="recurring"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="w-5 h-5 accent-coinGold rounded focus:ring-coinGold"
                />
                <label htmlFor="recurring" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 cursor-pointer">
                  <Repeat size={16} />
                  Repetir lançamento
                </label>
             </div>
             
             {isRecurring && (
               <div className="ml-8 animate-in slide-in-from-top-2 duration-200">
                  <select 
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-keepBlue-light rounded-lg outline-none bg-gray-50 dark:bg-keepBlue-dark dark:text-white transition-colors"
                  >
                    <option value="weekly">Semanalmente</option>
                    <option value="monthly">Mensalmente</option>
                    <option value="yearly">Anualmente</option>
                  </select>
               </div>
             )}
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-keepBlue-dark font-medium transition-colors">Cancelar</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-coinGold hover:bg-yellow-500 text-keepBlue rounded-lg font-bold shadow-md transition-colors">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}