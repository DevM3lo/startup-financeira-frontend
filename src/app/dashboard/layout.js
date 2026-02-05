'use client';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header'; 

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-keepBlue-dark transition-colors font-sans flex">
      
      {/* SIDEBAR */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        closeMobile={() => setIsSidebarOpen(false)} 
      />
      
      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300 min-w-0">
        
        {/* HEADER (Sino + Menu Mobile) */}
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

        {/* CONTEÚDO DAS PÁGINAS */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </main>
        
      </div>
    </div>
  );
}