// Isso simula o JSON que seu Java vai retornar no futuro
export const dashboardData = {
  saldo: 12450.75,
  receitas: {
    total: 7800.00,
    variacao: 5.2 // +5.2% vs mês anterior
  },
  despesas: {
    total: 4150.25,
    variacao: 8.1 // +8.1% vs mês anterior
  },
  transacoesRecentes: [
    { id: 1, titulo: "Supermercado", data: "15 Jun, 2024", valor: -254.90, tipo: "despesa", icone: "carrinho" },
    { id: 2, titulo: "Aluguel", data: "10 Jun, 2024", valor: -1500.00, tipo: "despesa", icone: "casa" },
    { id: 3, titulo: "Salário", data: "05 Jun, 2024", valor: 7800.00, tipo: "receita", icone: "dinheiro" }
  ]
};