'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Começa sempre como 'light' no estado inicial
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Verifica se o usuário JÁ salvou uma preferência antes
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Se tiver salvo (ex: ele ativou o dark mode ontem), respeita a escolha dele
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // SE NÃO TIVER NADA SALVO (Primeiro acesso): Força o Light Mode
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);