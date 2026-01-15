'use client';
import { useState } from 'react';
import { User, Mail, Lock, Save, LogOut, Bell, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../../providers/ThemeProvider';

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simula salvamento
    setTimeout(() => setLoading(false), 1000);
  };

  const handleLogout = () => {
    // Aqui limparíamos os cookies/token
    router.push('/'); 
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">Configurações</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Gerencie sua conta e preferências</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* Card de Perfil */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2 transition-colors">
            <User size={20} className="text-green-600" />
            Meu Perfil
          </h2>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Nome Completo</label>
                <input 
                  type="text" 
                  defaultValue="Eduardo Melo" 
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-700 dark:text-white transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                  <input 
                    type="email" 
                    defaultValue="dant@exemplo.com" 
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-700 dark:text-white transition-colors" 
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-70">
                <Save size={18} />
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>

        {/* Card de Preferências e Segurança */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Segurança */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2 transition-colors">
              <Lock size={20} className="text-green-600" />
              Segurança
            </h2>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium transition-colors">
                Alterar Senha
              </button>
              <button className="w-full text-left px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium transition-colors">
                Ativar Autenticação em 2 Etapas
              </button>
            </div>
          </div>

          {/* Preferências */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2 transition-colors">
              <Bell size={20} className="text-green-600" />
              Preferências
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-200">Notificações por Email</span>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-green-600" />
              </div>
              
              {/* Toggle de Dark Mode */}
              <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Moon size={18} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-200">Modo Escuro</span>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${
                    theme === 'dark' ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Zona de Perigo (Logout) */}
        <div className="flex justify-end">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-6 py-3 rounded-lg font-bold transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-800"
          >
            <LogOut size={20} />
            Sair da Conta
          </button>
        </div>

      </div>
    </div>
  );
}