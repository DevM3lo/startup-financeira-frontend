'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-keepBlue-dark transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        
        {/* Cabeçalho */}
        <div className="bg-keepBlue dark:bg-black p-8 text-center transition-colors">
          <div className="flex justify-center mb-4">
             <Image src="/logo.png" alt="KeepCoin" width={100} height={100} />
          </div>
          <h1 className="text-2xl font-bold">
            <span className="text-white">Keep</span>
            <span className="text-coinGold">Coin</span>
          </h1>
          <p className="text-gray-300 mt-2 text-sm">Faça login para gerenciar sua grana</p>
        </div>

        {/* Formulário */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-coinGold transition-colors" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com" 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-coinGold bg-white dark:bg-gray-700 text-keepBlue dark:text-white transition-all" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                <Link href="/recuperar-senha" className="text-xs text-coinGold hover:text-yellow-600 font-bold hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-coinGold transition-colors" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-coinGold bg-white dark:bg-gray-700 text-keepBlue dark:text-white transition-all" 
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-coinGold hover:bg-yellow-500 text-keepBlue font-bold py-3 rounded-xl transition-all shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Entrar <ArrowRight size={20} /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Não tem uma conta? <Link href="/cadastro" className="text-coinGold font-bold hover:underline">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}