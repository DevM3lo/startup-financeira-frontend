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
    // Simula envio de email
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {!sent ? (
          /* Estado 1: Formulário */
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Esqueceu a senha?</h1>
              <p className="text-gray-500 mt-2 text-sm">Digite seu e-mail e enviaremos um link de recuperação.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">E-mail cadastrado</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input type="email" placeholder="seu@email.com" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" required />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Enviar Link'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 flex items-center justify-center gap-2">
                <ArrowLeft size={16} /> Voltar para Login
              </Link>
            </div>
          </div>
        ) : (
          /* Estado 2: Sucesso */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">E-mail enviado!</h2>
            <p className="text-gray-500 text-sm mb-8">Verifique sua caixa de entrada (e spam) para redefinir sua senha.</p>
            
            <Link href="/" className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition-all">
              Voltar para Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}