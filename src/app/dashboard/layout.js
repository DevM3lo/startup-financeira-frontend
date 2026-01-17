import Sidebar from '../../components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    // MUDANÇA: dark:bg-keepBlue-dark (Azul Profundo) em vez de gray-900
    <div className="flex min-h-screen bg-gray-50 dark:bg-keepBlue-dark transition-colors font-sans">
      
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
      
    </div>
  );
}