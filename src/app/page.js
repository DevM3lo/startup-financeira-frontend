'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simula um delay de API de 1.5s para parecer real
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Container Principal */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Cabeçalho do Card */}
        <div className="bg-green-600 p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-green-600 mx-auto mb-4 shadow-lg">
            <span className="text-3xl font-bold">$</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Startup Financeira</h1>
          <p className="text-green-100 mt-2 text-sm">Gerencie suas finanças com inteligência</p>
        </div>

        {/* Formulário */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  placeholder="seu@email.com" 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required 
                />
              </div>
            </div>

            {/* Input Senha */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 block">Senha</label>
                <Link href="/recuperar-senha" className="text-xs text-green-600 hover:underline">
                      Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Botão de Entrar */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Entrando...
                </>
              ) : (
                <>
                  Acessar Painel
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Divisor */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-xs text-gray-400 font-medium">OU CONTINUE COM</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {/* Botão Social Fake */}
          <button className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          
          <p className="mt-8 text-center text-sm text-gray-500">
            Não tem uma conta? <Link href="/cadastro" className="text-green-600 font-bold hover:underline">Cadastre-se</Link>
          </p>
        </div>
      </div>

      {/* Feature List (Lado Direito em telas grandes, ou oculto em mobile) - OPCIONAL DECORATIVO */}
      <div className="hidden lg:block fixed bottom-8 right-8 text-gray-400 text-xs">
        <p>🔒 Ambiente Seguro & Criptografado</p>
      </div>
    </div>
  );
}