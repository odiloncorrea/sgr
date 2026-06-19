import { Rateio } from "./rateio";

export interface Conta {

    id?: number;

    descricao: string;
    observacao?: string;

    valor: number;
    vencimento: string;

    situacao: 'PENDENTE' | 'QUITADA' | 'CANCELADA';

    tipoContaId: number;
    tipoDescricao?: string;

    moradorResponsavelId: number;
    moradorResponsavelNome?: string;

    rateios: Rateio[];
}
