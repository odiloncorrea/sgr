export interface ContaPendente {
    contaId: number;
    tipo: string;
    valor: number;
    vencimento: string;
    situacao: 'PENDENTE' | 'QUITADA' | 'CANCELADA';
}
