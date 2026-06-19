import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Autenticacao } from '../../models/autenticacao';
import { ItemMenu } from '../../models/item-menu';

import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

  autenticacao: Autenticacao | null = null;

  menus: ItemMenu[] = [
    { descricao: 'Início', rota: '/' },
    { descricao: 'Tipos', rota: '/tipos' },
    { descricao: 'Moradores', rota: '/moradores' },
    { descricao: 'Contas', rota: '/contas' },
    { descricao: 'Saldo', rota: '/saldo' },
    { descricao: 'Extrato', rota: '/extrato' },
    { descricao: 'Usuários', rota: '/usuarios', perfis: ['ADMIN'] }
  ];

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {
    this.autenticacao = this.autenticacaoService.getAutenticacao();
  }

  menusPermitidos(): ItemMenu[] {
    return this.menus.filter(menu => {
      
      if (!menu.perfis || menu.perfis.length === 0) {
        return true;
      }

      if (!this.autenticacao) {
        return false;
      }

      return menu.perfis.includes(this.autenticacao.perfil);
    });

  }

  primeiroNome(): string {
    const nome = this.autenticacao?.moradorNome;

    if (!nome) {
      return '';
    }

    return nome.split(' ')[0];
  }

  sair(): void {
    this.autenticacaoService.sair();
    this.router.navigate(['/login']);
  }
}