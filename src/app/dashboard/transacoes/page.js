'use client';
import { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, ArrowUpCircle, ArrowDownCircle, Trash2, Edit2, Upload, Ghost } from 'lucide-react';
import NewTransactionModal from '../../../components/NewTransactionModal';
import EmptyState from '../../../components/EmptyState'; 
import { useToast } from '../../../providers/ToastProvider';

const initialTransactions = [
  { id: 1, description: 'Desenvolvimento de Site', category: 'Venda', date: '2024-01-15', amount: 2500.00, type: 'income', status: 'Concluído' },
  { id: 2, description: 'Servidor AWS', category: 'Infraestrutura', date: '2024-01-14', amount: 150.00, type: 'expense', status: 'Pendente' },
  { id: 3, description: 'Almoço de Negócios', category: 'Alimentação', date: '2024-01-12', amount: 85.50, type: 'expense', status: 'Concluído' },
];

export default function TransactionsPage() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [activeTab, setActiveTab] = useState('Todas'); 
  
  
  const { addToast } = useToast();

  
  const handleSaveTransaction = (transactionData) => {
    if (transactionData.id) {
      
      setTransactions((prev) => prev.map((t) => (t.id === transactionData.id ? transactionData : t)));
      addToast({ type: 'success', message: 'Transação atualizada com sucesso!' });
    } else {
      
      const newTx = { ...transactionData, id: Date.now() };
      setTransactions([newTx, ...transactions]);
      addToast({ type: 'success', message: 'Nova transação criada!' });
    }
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    setActiveMenuId(null);
    addToast({ type: 'info', message: 'Transação removida.' });
  };

  const handleOpenEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const handleOpenNew = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

 
  const filteredTransactions = transactions.filter(t => {
     if (activeTab === 'Todas') return true;
     return t.status === activeTab;
  });

  return (
    <div className="space-y-6 relative min-h-screen" onClick={() => setActiveMenuId(null)}>
      <NewTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
        initialData={editingTransaction} 
      />

      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-keepBlue dark:text-white transition-colors">Transações</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Gerencie suas entradas e saídas</p>
        </div>
        
        <div className="flex gap-2">
           {/* Botão Importar (Visual) */}
           <button className="bg-white dark:bg-keepBlue text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-keepBlue-light px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-50 dark:hover:bg-keepBlue-dark transition-all">
             <Upload size={20} />
             <span className="hidden sm:inline">Importar</span>
           </button>

           <button 
            onClick={(e) => { e.stopPropagation(); handleOpenNew(); }}
            className="bg-coinGold hover:bg-yellow-500 text-keepBlue px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-lg shadow-yellow-500/20 transition-all"
           >
            <Plus size={20} />
            <span className="hidden sm:inline">Nova Transação</span>
            <span className="sm:hidden">Nova</span>
           </button>
        </div>
      </div>

      {/* Abas de Navegação */}
      <div className="flex border-b border-gray-200 dark:border-keepBlue-light">
        {['Todas', 'Pendente', 'Concluído'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab
                ? 'border-coinGold text-coinGold'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-keepBlue dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filtros de Busca */}
      <div className="bg-white dark:bg-keepBlue p-4 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light flex flex-col sm:flex-row gap-4 justify-between items-center transition-colors">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Buscar transação..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:outline-none focus:ring-2 focus:ring-coinGold bg-white dark:bg-keepBlue-dark dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-keepBlue-dark px-4 py-2 rounded-lg border border-gray-200 dark:border-keepBlue-light transition-colors w-full sm:w-auto justify-center">
          <Filter size={18} />
          <span>Filtros</span>
        </button>
      </div>

      {/* CONDICIONAL: Tabela ou Empty State */}
      {filteredTransactions.length === 0 ? (
        
        
        <div className="mt-8">
          <EmptyState 
            icon={Ghost}
            title="Nenhuma transação encontrada"
            message={activeTab === 'Todas' ? "Você ainda não tem lançamentos. Comece adicionando um!" : `Nenhuma transação com status '${activeTab}'.`}
            actionLabel="Criar Transação"
            onAction={handleOpenNew}
          />
        </div>

      ) : (

        
        <div className="bg-white dark:bg-keepBlue rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light overflow-hidden pb-32 transition-colors">
          <div className="overflow-x-auto overflow-y-visible">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-keepBlue-dark/50 border-b border-gray-200 dark:border-keepBlue-light">
                <tr>
                  {['Descrição', 'Categoria', 'Data', 'Valor', 'Status', 'Ações'].map((head) => (
                    <th key={head} className={`px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase ${head === 'Ações' ? 'text-right' : ''}`}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-keepBlue-light">
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-keepBlue-dark/30 transition-colors relative">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          t.type === 'income' 
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {t.type === 'income' ? <ArrowUpCircle size={18} /> : <ArrowDownCircle size={18} />}
                        </div>
                        <span className="font-medium text-keepBlue dark:text-white">{t.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.date}</td>
                    <td className={`px-6 py-4 font-bold ${t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {t.type === 'income' ? '+' : '-'} {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          t.status === 'Concluído' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === t.id ? null : t.id); }}
                        className="text-gray-400 hover:text-keepBlue dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-keepBlue-dark transition-colors"
                      >
                        <MoreHorizontal size={20} />
                      </button>
                      {activeMenuId === t.id && (
                        <div className="absolute right-8 top-12 z-50 w-48 bg-white dark:bg-keepBlue rounded-xl shadow-xl border border-gray-100 dark:border-keepBlue-light py-2 animate-in fade-in zoom-in duration-200">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleOpenEdit(t); }} 
                            className="w-full px-4 py-2 text-left text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-keepBlue-dark flex items-center gap-2"
                          >
                            <Edit2 size={16} /> Editar
                          </button>
                          <button onClick={(e) => { 
                              e.stopPropagation(); 
                              handleDelete(t.id);
                            }} className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
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
      )}
    </div>
  );
}