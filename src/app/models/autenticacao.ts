export interface Autenticacao {
    id: number;
    login: string;
    perfil: 'ADMIN' | 'MORADOR';

    moradorId: number;
    moradorNome: string;
}
