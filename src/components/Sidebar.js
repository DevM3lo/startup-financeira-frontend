'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ArrowRightLeft, Wallet, Target, BarChart3, Settings, X } from 'lucide-react';

export default function Sidebar({ isOpen, closeMobile }) {
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
    <>
      {/* SIDEBAR */}
      <aside 
        className={`
          fixed top-0 left-0 z-40 h-full w-64 
          bg-white dark:bg-keepBlue border-r border-gray-100 dark:border-keepBlue-light 
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 
        `}
      >
        {/* Cabeçalho da Sidebar */}
        <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-keepBlue-light">
          <div className="flex items-center gap-3">
            
            {/* LOGICA DE TROCA DE LOGO */}
            <div className="w-10 h-10 relative flex items-center justify-center">
               {/* 1. Logo Light (Azul Escuro) - Some no Dark Mode */}
               <Image 
                 src="/logo.png" 
                 alt="KeepCoin Logo" 
                 width={40} 
                 height={40} 
                 className="dark:hidden object-contain" 
               />

               {/* 2. Logo Dark (Azul Claro) - Aparece só no Dark Mode */}
               <Image 
                 src="/logo-claro.png" 
                 alt="KeepCoin Logo Dark" 
                 width={40} 
                 height={40} 
                 className="hidden dark:block object-contain" 
               />
            </div>

            <div className="text-xl font-bold">
              <span className="text-keepBlue dark:text-white transition-colors">Keep</span>
              <span className="text-coinGold">Coin</span>
            </div>
          </div>

          {/* Botão X (Só aparece no Mobile) */}
          <button 
            onClick={closeMobile}
            className="md:hidden text-gray-500 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-90px)]">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                onClick={closeMobile} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? 'bg-coinGold/10 text-coinGold' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-keepBlue-dark hover:text-keepBlue dark:hover:text-white'
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* OVERLAY (Fundo preto transparente no mobile quando aberto) */}
      {isOpen && (
        <div 
          onClick={closeMobile}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
        />
      )}
    </>
  );
}