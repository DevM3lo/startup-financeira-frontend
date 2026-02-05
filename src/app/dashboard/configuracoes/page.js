'use client';
import { useState } from 'react';
import { User, Mail, Lock, Save, LogOut, Bell, Moon, Users, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../../providers/ThemeProvider';

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

 
  const [name, setName] = useState('Eduardo Melo');
  const [email, setEmail] = useState('dant@exemplo.com');

  
  const [inviteEmail, setInviteEmail] = useState('');
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: 'Ana Silva', email: 'ana@exemplo.com', role: 'Admin', status: 'Ativo' },
    
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleLogout = () => {
    router.push('/'); 
  };

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail) return;
    
    const newMember = {
      id: Date.now(),
      name: 'Convidado...',
      email: inviteEmail,
      role: 'Editor',
      status: 'Pendente'
    };
    setFamilyMembers([...familyMembers, newMember]);
    setInviteEmail('');
  };

  const removeMember = (id) => {
    setFamilyMembers(familyMembers.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-keepBlue dark:text-white transition-colors">Configurações</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Gerencie sua conta, preferências e família</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* 1. Card de Perfil */}
        <div className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light transition-colors">
          <h2 className="text-lg font-bold text-keepBlue dark:text-white mb-4 flex items-center gap-2 transition-colors">
            <User size={20} className="text-coinGold" />
            Meu Perfil
          </h2>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Nome Completo</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white transition-colors" 
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button disabled={loading} className="bg-coinGold hover:bg-yellow-500 text-keepBlue px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-70 shadow-md">
                <Save size={18} />
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>

        {/* 2. NOVO: Card de Família / Casal (Item B8) */}
        <div className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light transition-colors">
          <h2 className="text-lg font-bold text-keepBlue dark:text-white mb-4 flex items-center gap-2 transition-colors">
            <Users size={20} className="text-coinGold" />
            Família & Compartilhamento
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Convide seu parceiro(a) para gerenciar as finanças juntos.</p>
          
          {/* Input de Convite */}
          <form onSubmit={handleInvite} className="flex gap-3 mb-6">
            <input 
              type="email" 
              placeholder="Digite o e-mail do parceiro(a)" 
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 dark:border-keepBlue-light rounded-lg focus:ring-2 focus:ring-coinGold outline-none bg-white dark:bg-keepBlue-dark dark:text-white transition-colors"
            />
            <button type="submit" className="bg-keepBlue dark:bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2">
              <Plus size={18} /> Convidar
            </button>
          </form>

          {/* Lista de Membros */}
          <div className="space-y-3">
            {familyMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-keepBlue-dark rounded-lg border border-gray-100 dark:border-keepBlue-light">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-coinGold/20 text-coinGold flex items-center justify-center font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-keepBlue dark:text-white text-sm">{member.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${member.status === 'Ativo' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                    {member.status}
                  </span>
                  <button onClick={() => removeMember(member.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Card de Preferências e Segurança (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light transition-colors">
            <h2 className="text-lg font-bold text-keepBlue dark:text-white mb-4 flex items-center gap-2 transition-colors">
              <Lock size={20} className="text-coinGold" />
              Segurança
            </h2>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-gray-200 dark:border-keepBlue-light rounded-lg hover:bg-gray-50 dark:hover:bg-keepBlue-dark text-gray-700 dark:text-gray-200 font-medium transition-colors">
                Alterar Senha
              </button>
              <button className="w-full text-left px-4 py-3 border border-gray-200 dark:border-keepBlue-light rounded-lg hover:bg-gray-50 dark:hover:bg-keepBlue-dark text-gray-700 dark:text-gray-200 font-medium transition-colors">
                Ativar Autenticação em 2 Etapas
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-keepBlue p-6 rounded-xl shadow-sm border border-gray-100 dark:border-keepBlue-light transition-colors">
            <h2 className="text-lg font-bold text-keepBlue dark:text-white mb-4 flex items-center gap-2 transition-colors">
              <Bell size={20} className="text-coinGold" />
              Preferências
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-keepBlue-light rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-200">Notificações por Email</span>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-coinGold rounded" />
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-keepBlue-light rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Moon size={18} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-200">Modo Escuro</span>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${
                    theme === 'dark' ? 'bg-coinGold' : 'bg-gray-200'
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

        {/* Zona de Perigo */}
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