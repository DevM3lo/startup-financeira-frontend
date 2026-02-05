import './globals.css';
import { ThemeProvider } from '../providers/ThemeProvider';
import { ToastProvider } from '../providers/ToastProvider';

export const metadata = {
  title: {
    default: 'KeepCoin - Gestão Financeira',
    template: '%s | KeepCoin'
  },
  description: 'Organize sua vida financeira, controle gastos e alcance suas metas com o KeepCoin.',
  icons: {
    icon: '/logo.png', 
    shortcut: '/logo.png',
    apple: '/logo.png', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      
      <body className="bg-gray-50 dark:bg-keepDark text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}