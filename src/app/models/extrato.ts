export interface Extrato {

    rateioId: number;

    tipo: string;
    valor: number;
    vencimento: string;

    situacao: string;

    moradorId: number;
    moradorNome: string;

    contaId: number;
    contaDescricao: string;
}