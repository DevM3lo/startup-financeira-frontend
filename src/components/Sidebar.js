'use client';
import Link from 'next/link';
import Image from 'next/image'; // Importe o componente de Imagem
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
    <aside className="w-64 bg-white dark:bg-keepBlue border-r border-gray-100 dark:border-keepBlue-light fixed h-full transition-colors z-10">
      
      {/* LOGO KEEPCOIN */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-100 dark:border-gray-800">
        {/* Imagem da Logo */}
        <div className="w-10 h-10 relative">
             {/* Certifique-se que o arquivo logo.png está na pasta public */}
            <Image src="/logo.png" alt="KeepCoin Logo" width={40} height={40} className="object-contain" />
        </div>
        
        {/* Texto da Marca */}
        <div className="text-xl font-bold">
            {/* No modo claro: Keep é Azul. No modo escuro: Keep é Branco (pra ler). Coin sempre Dourado. */}
            <span className="text-keepBlue dark:text-white transition-colors">Keep</span>
            <span className="text-coinGold">Coin</span>
        </div>
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
                  ? 'bg-coinGold/10 text-coinGold' // Fundo dourado clarinho e texto dourado
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-keepBlue dark:hover:text-white'
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