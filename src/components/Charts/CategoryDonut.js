'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '../../providers/ThemeProvider'; // <--- 1. Import do Hook

const data = [
  { name: 'Alimentação', value: 400 },
  { name: 'Moradia', value: 300 },
  { name: 'Lazer', value: 300 },
  { name: 'Transporte', value: 200 },
];

const COLORS = ['#16a34a', '#22c55e', '#86efac', '#bbf7d0']; // Tons de verde

export default function CategoryDonut() {
  const { theme } = useTheme(); // <--- 2. Pega o tema
  const isDark = theme === 'dark';

  // 3. Define cores dinâmicas para Tooltip e Legenda
  const tooltipBg = isDark ? '#1f2937' : '#fff'; 
  const tooltipBorder = isDark ? '#374151' : '#f3f4f6';
  const textColor = isDark ? '#e5e7eb' : '#374151'; // Cor do texto da legenda e tooltip

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-96 transition-colors">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 transition-colors">Gastos por Categoria</h3>
      <div className="h-full pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke={isDark ? '#1f2937' : '#fff'} // Borda das fatias combinando com o fundo
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            
            <Tooltip 
               contentStyle={{ 
                backgroundColor: tooltipBg, 
                borderColor: tooltipBorder,
                borderRadius: '8px', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                color: textColor
              }}
              itemStyle={{ color: textColor }}
            />
            
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              wrapperStyle={{ color: textColor }} // Força a cor do texto da legenda
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}