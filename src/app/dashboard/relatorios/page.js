'use client';
import { Download, Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { useTheme } from '../../../providers/ThemeProvider'; // <--- Import do Hook

const dataEvolution = [
  { name: 'Jan', receita: 4000, despesa: 2400, saldo: 1600 },
  { name: 'Fev', receita: 3000, despesa: 1398, saldo: 1602 },
  { name: 'Mar', receita: 5000, despesa: 4800, saldo: 200 },
  { name: 'Abr', receita: 2780, despesa: 2908, saldo: -128 },
  { name: 'Mai', receita: 4890, despesa: 2800, saldo: 2090 },
  { name: 'Jun', receita: 5390, despesa: 3800, saldo: 1590 },
];

export default function ReportsPage() {
  const { theme } = useTheme(); // <--- Detecta o tema
  const isDark = theme === 'dark';

  // Cores dinâmicas para os gráficos
  const gridColor = isDark ? '#374151' : '#eee';
  const textColor = isDark ? '#9ca3af' : '#888';
  const tooltipBg = isDark ? '#1f2937' : '#fff';
  const tooltipBorder = isDark ? '#374151' : '#f3f4f6';

  return (
    <div className="space-y-6">
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">Relatórios Financeiros</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Análise detalhada do seu fluxo de caixa</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 transition-colors">
            <Calendar size={18} />
            <span>Últimos 6 meses</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download size={18} />
            <span>Exportar PDF</span>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Taxa de Economia</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">28.5%</h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Média de Gastos</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">R$ 3.017</h3>
          </div>
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center">
            <TrendingDown size={24} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Patrimônio Líquido</p>
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">+ R$ 6.954</h3>
          </div>
          <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
            <DollarSign size={24} />
          </div>
        </div>
      </div>

      {/* Gráfico 1: Área */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-96 transition-colors">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 transition-colors">Fluxo de Caixa Acumulado</h3>
        <div className="h-full pb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataEvolution}>
              <defs>
                <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: textColor, fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: textColor, fontSize: 12}} tickFormatter={(value) => `R$${value}`} />
              <Tooltip 
                 contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: textColor }}
                 itemStyle={{ color: textColor }}
              />
              <Area type="monotone" dataKey="saldo" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorSaldo)" name="Saldo Líquido" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico 2: Barras */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-80 transition-colors">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 transition-colors">Receitas vs Despesas</h3>
        <div className="h-full pb-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataEvolution}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: textColor, fontSize: 12}} />
              <Tooltip 
                cursor={{fill: 'transparent'}} 
                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px', color: textColor }}
                itemStyle={{ color: textColor }}
              />
              <Legend wrapperStyle={{ color: textColor }} />
              <Bar dataKey="receita" fill="#22c55e" name="Entradas" radius={[4, 4, 0, 0]} />
              <Bar dataKey="despesa" fill="#ef4444" name="Saídas" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}