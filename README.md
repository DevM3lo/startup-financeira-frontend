# 🐷 KeepCoin - Gestão Financeira Inteligente

O **KeepCoin** é uma aplicação web moderna para controle financeiro pessoal. O objetivo é oferecer uma interface limpa, rápida e intuitiva para que o usuário gerencie suas receitas, despesas, orçamentos e metas financeiras.

Este repositório contém o **Frontend** da aplicação, construído com foco em UX (Experiência do Usuário), Performance e Design Responsivo.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as tecnologias mais modernas do ecossistema React:

- **[Next.js 14+](https://nextjs.org/)** - Framework React (App Router).
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização utilitária e responsiva.
- **[Lucide React](https://lucide.dev/)** - Ícones leves e consistentes.
- **[Axios](https://axios-http.com/)** - Cliente HTTP para conexão com API.
- **Chart.js / Componentes Visuais** - Visualização de dados.

---

## ✨ Funcionalidades Principais

### 📊 Dashboard Interativo
- Visão geral de Saldo, Receitas, Despesas e Economia.
- Gráficos visuais para análise de fluxo de caixa.
- **Skeleton Loading:** Feedback visual enquanto os dados carregam.

### 💸 Gestão de Transações
- Listagem completa com filtros (Receitas/Despesas/Pendente/Concluído).
- Modal para adição e edição rápida de lançamentos.
- **Máscara de Moeda:** Inputs inteligentes que formatam R$ automaticamente.

### 🎯 Metas & Orçamentos
- Definição de limites de gastos por categoria com barras de progresso.
- Criação de metas financeiras (ex: "Reserva de Emergência") com acompanhamento visual.

### 🎨 UI/UX Premium
- **Dark Mode Real:** Tema escuro totalmente integrado (alternância de cores e logos).
- **Responsividade:** Menu lateral (Sidebar) que se adapta para Menu Hambúrguer no mobile.
- **Empty States:** Telas amigáveis quando não há dados para exibir.
- **Página 404 Personalizada:** Tratamento de erros de rota.

---

## 🔧 Instalação e Execução

Pré-requisitos: Node.js instalado.

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/devm3lo/keepcoin-web.git](https://github.com/devm3lo/keepcoin-web.git)
   cd keepcoin-web