export interface Usuario {

    id?: number;

    login: string;
    senha?: string;

    perfil: 'ADMIN' | 'MORADOR';

    moradorId: number;
    moradorNome?: string;
}