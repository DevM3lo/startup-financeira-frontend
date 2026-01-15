'use client';
import { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, ArrowUpCircle, ArrowDownCircle, Trash2, Edit2 } from 'lucide-react';
import NewTransactionModal from '../../../components/NewTransactionModal';

const initialTransactions = [
  { id: 1, description: 'Desenvolvimento de Site', category: 'Venda', date: '2024-01-15', amount: 2500.00, type: 'income', status: 'Concluído' },
  { id: 2, description: 'Servidor AWS', category: 'Infraestrutura', date: '2024-01-14', amount: 150.00, type: 'expense', status: 'Processando' },
  { id: 3, description: 'Almoço de Negócios', category: 'Alimentação', date: '2024-01-12', amount: 85.50, type: 'expense', status: 'Concluído' },
];

export default function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const handleAddNewTransaction = (newTx) => {
    const transactionWithId = { ...newTx, id: Date.now() };
    setTransactions([transactionWithId, ...transactions]);
  };

  const handleDelete = (id) => {
    const updatedList = transactions.filter(t => t.id !== id);
    setTransactions(updatedList);
    setActiveMenuId(null);
  };

  return (
    <div className="space-y-6 relative min-h-screen" onClick={() => setActiveMenuId(null)}>
      <NewTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddNewTransaction}
      />

      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">Transações</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Gerencie suas entradas e saídas</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus size={20} />
          Nova Transação
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between items-center transition-colors">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Buscar transação..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors w-full sm:w-auto justify-center">
          <Filter size={18} />
          <span>Filtros</span>
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden pb-32 transition-colors">
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                {['Descrição', 'Categoria', 'Data', 'Valor', 'Status', 'Ações'].map((head) => (
                  <th key={head} className={`px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase ${head === 'Ações' ? 'text-right' : ''}`}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors relative">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        t.type === 'income' 
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {t.type === 'income' ? <ArrowUpCircle size={18} /> : <ArrowDownCircle size={18} />}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{t.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.date}</td>
                  <td className={`px-6 py-4 font-bold ${t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {t.type === 'income' ? '+' : '-'} {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === t.id ? null : t.id); }}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                    {activeMenuId === t.id && (
                      <div className="absolute right-8 top-12 z-50 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 animate-in fade-in zoom-in duration-200">
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                          <Edit2 size={16} /> Editar
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(t.id); }} className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                          <Trash2 size={16} /> Excluir
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}