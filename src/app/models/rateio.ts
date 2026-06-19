export interface Rateio {
    id?: number;
    moradorId: number;
    moradorNome?: string;
    valor: number;
    situacao: 'EM_ABERTO' | 'PAGO';
}
