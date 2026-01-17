'use client';
import { Download, Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { useTheme } from '../../../providers/ThemeProvider';

const dataEvolution = [
  { name: 'Jan', receita: 4000, despesa: 2400, saldo: 1600 },
  { name: 'Fev', receita: 3000, despesa: 1398, saldo: 1602 },
  { name: 'Mar', receita: 5000, despesa: 4800, saldo: 200 },
  { name: 'Abr', receita: 2780, despesa: 2908, saldo: -128 },
  { name: 'Mai', receita: 4890, despesa: 2800, saldo: 2090 },
  { name: 'Jun', receita: 5390, despesa: 3800, saldo: 1590 },
];

export default function ReportsPage() {
  const { theme } = useTheme(); 
  const isDark = theme === 'dark';

  // CORES DO TEMA KEEPCOIN (HEX)
  const colors = {
    gold: '#EAB308',
    green: '#22C55E',
    red: '#EF4444',
    grid: isDark ? '#1e3a66' : '#e5e7eb',
    text: isDark ? '#9ca3af' : '#64748b',
    tooltipBg: isDark ? '#0f2545' : '#ffffff',
    tooltipBorder: isDark ? '#1e3a66' : '#f3f4f6'
  };

  return (
    <div className="space-y-6">
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-keepBlue dark:text-white transition-colors">Relatórios Financeiros</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Análise detalhada do seu fluxo</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-keepBlue-dark bg-white dark:bg-keepBlue transition-colors">
            <Calendar size={18} />
            <span>Últimos 6 meses</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-coinGold text-keepBlue font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-sm">
            <Download size={18} />
            <span>Exportar PDF</span>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light flex items-center justify-between transition-colors">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Taxa de Economia</p>
            <h3 className="text-2xl font-bold text-keepBlue dark:text-white">28.5%</h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
        </div>
        <div className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light flex items-center justify-between transition-colors">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Média de Gastos</p>
            <h3 className="text-2xl font-bold text-keepBlue dark:text-white">R$ 3.017</h3>
          </div>
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center">
            <TrendingDown size={24} />
          </div>
        </div>
        <div className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light flex items-center justify-between transition-colors">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Patrimônio Líquido</p>
            <h3 className="text-2xl font-bold text-green-500 dark:text-green-400">+ R$ 6.954</h3>
          </div>
          <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
            <DollarSign size={24} />
          </div>
        </div>
      </div>

      {/* Gráfico 1: Área (Saldo) */}
      <div className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light h-96 transition-colors">
        <h3 className="text-lg font-bold text-keepBlue dark:text-white mb-6 transition-colors">Fluxo de Caixa Acumulado</h3>
        <div className="h-full pb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataEvolution}>
              <defs>
                <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.gold} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={colors.gold} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.grid} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: colors.text, fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: colors.text, fontSize: 12}} tickFormatter={(value) => `R$${value}`} />
              <Tooltip 
                 contentStyle={{ backgroundColor: colors.tooltipBg, borderColor: colors.tooltipBorder, borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: colors.text }}
                 itemStyle={{ color: colors.text }}
              />
              {/* Linha Dourada para o Saldo */}
              <Area type="monotone" dataKey="saldo" stroke={colors.gold} strokeWidth={3} fillOpacity={1} fill="url(#colorSaldo)" name="Saldo Líquido" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico 2: Barras (Receita vs Despesa) */}
      <div className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light h-80 transition-colors">
        <h3 className="text-lg font-bold text-keepBlue dark:text-white mb-6 transition-colors">Receitas vs Despesas</h3>
        <div className="h-full pb-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataEvolution}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.grid} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: colors.text, fontSize: 12}} />
              <Tooltip 
                cursor={{fill: isDark ? '#1e3a66' : '#f3f4f6', opacity: 0.4}} 
                contentStyle={{ backgroundColor: colors.tooltipBg, borderColor: colors.tooltipBorder, borderRadius: '8px', color: colors.text }}
                itemStyle={{ color: colors.text }}
              />
              <Legend wrapperStyle={{ color: colors.text }} />
              <Bar dataKey="receita" fill={colors.green} name="Entradas" radius={[4, 4, 0, 0]} />
              <Bar dataKey="despesa" fill={colors.red} name="Saídas" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}