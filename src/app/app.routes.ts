import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Login } from './components/login/login';
import { Principal } from './components/layout/principal/principal';
import { MoradorList } from './components/morador-list/morador-list';
import { MoradorForm } from './components/morador-form/morador-form';
import { TipoList } from './components/tipo-list/tipo-list';
import { TipoForm } from './components/tipo-form/tipo-form';
import { ContaList } from './components/conta-list/conta-list';
import { ContaForm } from './components/conta-form/conta-form';
import { UsuarioList } from './components/usuario-list/usuario-list';
import { UsuarioForm } from './components/usuario-form/usuario-form';
import { SaldoList } from './components/saldo-list/saldo-list';
import { ExtratoList } from './components/extrato-list/extrato-list';
import { Painel } from './components/painel/painel';

export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: '',
    component: Principal,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: Painel
      },
      {
        path: 'moradores',
        component: MoradorList
      },
      {
        path: 'moradores/cadastrar',
        component: MoradorForm
      },
      {
        path: 'moradores/alterar/:id',
        component: MoradorForm
      },
      {
        path: 'tipos',
        component: TipoList
      },
      {
        path: 'tipos/cadastrar',
        component: TipoForm
      },
      {
        path: 'tipos/alterar/:id',
        component: TipoForm
      },
      {
        path: 'contas',
        component: ContaList
      },
      {
        path: 'contas/cadastrar',
        component: ContaForm
      },
      {
        path: 'contas/alterar/:id',
        component: ContaForm
      },
      {
        path: 'contas/duplicar/:id',
        component: ContaForm
      },
      {
        path: 'usuarios',
        component: UsuarioList
      },
      {
        path: 'usuarios/cadastrar',
        component: UsuarioForm
      },
      {
        path: 'saldo',
        component: SaldoList
      },
      {
        path: 'extrato',
        component: ExtratoList
      },
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];