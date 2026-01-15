'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simula cadastro e joga pro dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        <div className="bg-gray-900 p-8 text-center">
          <h1 className="text-2xl font-bold text-white">Crie sua conta</h1>
          <p className="text-gray-400 mt-2 text-sm">Comece a controlar suas finanças hoje</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Nome */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Seu nome" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" required />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="email" placeholder="seu@email.com" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" required />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" required />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all mt-6 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Criar Conta <ArrowRight size={20} /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Já tem uma conta? <Link href="/" className="text-green-600 font-bold hover:underline">Fazer Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}