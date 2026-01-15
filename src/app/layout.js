import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Startup Financeira",
  description: "Sistema de gestão financeira SaaS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}