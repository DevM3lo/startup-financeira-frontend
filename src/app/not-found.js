import Link from 'next/link';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-keepDark text-center p-4 transition-colors duration-300">
      
      {/* Ícone Animado */}
      <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <AlertTriangle size={48} className="text-red-500 dark:text-red-400" />
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-keepBlue dark:text-white mb-4">
        Ops! 404
      </h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mb-8">
        A página que você está procurando sumiu do mapa ou nunca existiu. Talvez o porquinho tenha comido ela. 🐷
      </p>

      <Link 
        href="/dashboard" 
        className="flex items-center gap-2 px-6 py-3 bg-coinGold hover:bg-yellow-500 text-keepBlue font-bold rounded-xl transition-all hover:scale-105 shadow-lg"
      >
        <Home size={20} />
        Voltar para o Início
      </Link>
      
    </div>
  );
}