'use client';
import { useState } from 'react';
import { Menu, Bell, User, Check, X } from 'lucide-react';
import Image from 'next/image';


const initialNotifications = [
  { id: 1, title: 'Orçamento Excedido', msg: 'Você gastou 100% do orçamento de Lazer.', type: 'alert', read: false, time: '2 min atrás' },
  { id: 2, title: 'Meta Atingida! 🚀', msg: 'Parabéns! Você completou a Reserva de Emergência.', type: 'success', read: false, time: '1 hora atrás' },
  { id: 3, title: 'Fatura Próxima', msg: 'Sua fatura vence em 3 dias.', type: 'info', read: true, time: 'Ontem' },
];

export default function Header({ onOpenSidebar }) {
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotif = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <header className="bg-white dark:bg-keepBlue border-b border-gray-100 dark:border-keepBlue-light sticky top-0 z-20 h-16 px-4 md:px-8 flex items-center justify-between transition-colors shadow-sm">
      
      {/* ESQUERDA: Botão Mobile + Logo Mobile ou Título Desktop */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenSidebar}
          className="md:hidden p-2 text-keepBlue dark:text-white hover:bg-gray-100 dark:hover:bg-keepBlue-light rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        
        {/* Logo visível apenas no Mobile (Desktop já tem na Sidebar) */}
        <div className="md:hidden flex items-center gap-2">
           {/* Modo Claro (Azul Escuro) - Some no Dark */}
           <Image 
             src="/logo.png" 
             alt="Logo KeepCoin" 
             width={28} 
             height={28} 
             className="dark:hidden"
           />
           {/* Modo Escuro (Azul Claro) - Aparece no Dark */}
           <Image 
             src="/logo-claro.png" 
             alt="Logo KeepCoin Dark" 
             width={28} 
             height={28} 
             className="hidden dark:block"
           />
           
           <span className="font-bold text-keepBlue dark:text-white">
             Keep<span className="text-coinGold">Coin</span>
           </span>
        </div>

        {/* Desktop: Boas vindas (Opcional) */}
        <div className="hidden md:block">
          <h2 className="font-bold text-keepBlue dark:text-white">Olá, Eduardo 👋</h2>
        </div>
      </div>

      {/* DIREITA: Notificações e Perfil */}
      <div className="flex items-center gap-4">
        
        {/* SINO DE NOTIFICAÇÕES */}
        <div className="relative">
          <button 
            onClick={() => setShowNotif(!showNotif)}
            className="relative p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-keepBlue-dark rounded-full transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-keepBlue"></span>
            )}
          </button>

          {/* POPOVER DE NOTIFICAÇÕES */}
          {showNotif && (
            <>
              {/* Overlay invisível para fechar ao clicar fora */}
              <div className="fixed inset-0 z-30" onClick={() => setShowNotif(false)} />
              
              <div className="absolute right-0 top-12 w-80 bg-white dark:bg-keepBlue rounded-xl shadow-xl border border-gray-100 dark:border-keepBlue-light z-40 animate-in fade-in zoom-in duration-200 overflow-hidden">
                <div className="p-3 border-b border-gray-100 dark:border-keepBlue-light flex justify-between items-center bg-gray-50 dark:bg-keepBlue-dark">
                  <h3 className="font-bold text-sm text-keepBlue dark:text-white">Notificações</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-coinGold hover:underline font-medium">
                      Marcar lidas
                    </button>
                  )}
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">Nenhuma notificação nova.</div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className={`p-4 border-b border-gray-100 dark:border-keepBlue-light hover:bg-gray-50 dark:hover:bg-keepBlue-dark/50 transition-colors relative group ${!notif.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                        <div className="flex gap-3">
                          <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!notif.read ? 'bg-coinGold' : 'bg-gray-300'}`} />
                          <div className="flex-1">
                            <p className="text-sm font-bold text-keepBlue dark:text-white">{notif.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.msg}</p>
                            <p className="text-[10px] text-gray-400 mt-2">{notif.time}</p>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); removeNotif(notif.id); }} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2">
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Avatar (Decorativo) */}
        <div className="w-8 h-8 rounded-full bg-coinGold text-keepBlue flex items-center justify-center font-bold text-sm">
          EM
        </div>
      </div>
    </header>
  );
}