'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ArrowRightLeft, Wallet, Target, BarChart3, Settings } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Transações', icon: ArrowRightLeft, path: '/dashboard/transacoes' },
    { name: 'Orçamentos', icon: Wallet, path: '/dashboard/orcamentos' },
    { name: 'Metas', icon: Target, path: '/dashboard/metas' },
    { name: 'Relatórios', icon: BarChart3, path: '/dashboard/relatorios' },
    { name: 'Configurações', icon: Settings, path: '/dashboard/configuracoes' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 fixed h-full transition-colors z-10">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
          $
        </div>
        <span className="text-xl font-bold text-gray-800 dark:text-white">Finanças</span>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive 
                  ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}