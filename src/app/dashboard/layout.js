import Sidebar from '../../components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    // AQUI ESTÁ O SEGREDO: dark:bg-gray-900
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      
      {/* A Sidebar fica fixa na esquerda */}
      <Sidebar />
      
      {/* O conteúdo principal fica na direita */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
      
    </div>
  );
}