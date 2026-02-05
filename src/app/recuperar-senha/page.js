'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-keepBlue-dark transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        
        {!sent ? (
          
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-keepBlue dark:text-white transition-colors">Esqueceu a senha?</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm transition-colors">Digite seu e-mail e enviaremos um link de recuperação.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">E-mail cadastrado</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-coinGold transition-colors" size={20} />
                  <input 
                    type="email" 
                    placeholder="seu@email.com" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-coinGold bg-white dark:bg-gray-700 text-keepBlue dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all" 
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-coinGold hover:bg-yellow-500 text-keepBlue font-bold py-3 rounded-xl transition-all shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Enviar Link'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-keepBlue dark:hover:text-white flex items-center justify-center gap-2 transition-colors">
                <ArrowLeft size={16} /> Voltar para Login
              </Link>
            </div>
          </div>
        ) : (
          
          <div className="p-8 text-center">
            {/* Ícone de Sucesso Dourado */}
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 text-coinGold rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-keepBlue dark:text-white mb-2 transition-colors">E-mail enviado!</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 transition-colors">Verifique sua caixa de entrada (e spam) para redefinir sua senha.</p>
            
            <Link href="/" className="block w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 rounded-xl transition-all">
              Voltar para Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}