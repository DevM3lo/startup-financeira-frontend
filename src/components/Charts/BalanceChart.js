'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../providers/ThemeProvider'; // <--- 1. Importe o Hook

const data = [
  { name: 'Jan', receitas: 4000, despesas: 2400 },
  { name: 'Fev', receitas: 3000, despesas: 1398 },
  { name: 'Mar', receitas: 2000, despesas: 9800 },
  { name: 'Abr', receitas: 2780, despesas: 3908 },
  { name: 'Mai', receitas: 1890, despesas: 4800 },
  { name: 'Jun', receitas: 2390, despesas: 3800 },
];

export default function BalanceChart() {
  const { theme } = useTheme(); // <--- 2. Pega o tema atual
  const isDark = theme === 'dark';

  // 3. Define as cores baseado no tema
  const gridColor = isDark ? '#374151' : '#eee'; // Linhas da grade
  const textColor = isDark ? '#9ca3af' : '#888'; // Texto dos eixos
  const tooltipBg = isDark ? '#1f2937' : '#fff'; // Fundo do tooltip
  const tooltipBorder = isDark ? '#374151' : '#f3f4f6'; // Borda do tooltip

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-96 transition-colors">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 transition-colors">Balanço Mensal</h3>
      <div className="h-full pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            {/* Grid com cor dinâmica */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            
            {/* Eixos com cor de texto dinâmica */}
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: textColor, fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: textColor, fontSize: 12}} tickFormatter={(value) => `R$${value}`} />
            
            {/* Tooltip com estilo dinâmico */}
            <Tooltip 
              contentStyle={{ 
                backgroundColor: tooltipBg, 
                borderColor: tooltipBorder,
                borderRadius: '8px', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                color: isDark ? '#fff' : '#000'
              }}
              itemStyle={{ fontSize: '12px' }}
              cursor={{ fill: isDark ? '#374151' : '#f3f4f6', opacity: 0.4 }}
            />
            
            <Bar dataKey="receitas" fill="#16a34a" radius={[4, 4, 0, 0]} name="Receitas" />
            <Bar dataKey="despesas" fill="#dc2626" radius={[4, 4, 0, 0]} name="Despesas" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}