import BalanceChart from '../../components/Charts/BalanceChart';
import CategoryDonut from '../../components/Charts/CategoryDonut';
import TransactionList from '../../components/TransactionList';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-keepBlue dark:text-white transition-colors">Visão Geral</h1>
      
      {/* Cards de Topo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light transition-colors relative overflow-hidden group">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Saldo Total</p>
          <h3 className="text-3xl font-bold text-keepBlue dark:text-white mt-2">R$ 12.450,00</h3>
        </div>
        <div className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light transition-colors">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Receitas</p>
          <h3 className="text-2xl font-bold text-green-500 mt-2">+ R$ 4.200,00</h3>
        </div>
        <div className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light transition-colors">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Despesas</p>
          <h3 className="text-2xl font-bold text-red-500 mt-2">- R$ 1.800,00</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BalanceChart />
        </div>
        <div className="lg:col-span-1">
          <CategoryDonut />
        </div>
      </div>

      <div className="w-full">
        <TransactionList />
      </div>
    </div>
  );
}