import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { Conta } from '../../models/conta';
import { ContaService } from '../../services/conta.service';

@Component({
  selector: 'app-conta-list',
  imports: [RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './conta-list.html',
  styleUrl: './conta-list.css',
})
export class ContaList {

  contas: Conta[] = [];
  mensagemErro = '';

  constructor(private contaService: ContaService) { }

  ngOnInit(): void {
    this.listarContas();
  }

  listarContas(): void {
    this.contaService.listar().subscribe({
      next: (dados) => {
        this.contas = dados;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar a lista de contas.';
      }
    });
  }

  excluir(id: number): void {
    if (!confirm('Deseja realmente excluir esta conta?')) {
      return;
    }

    this.contaService.excluir(id.toString()).subscribe({
      next: () => {
        this.listarContas();
      },
      error: () => {
        this.mensagemErro = 'Erro ao excluir conta.';
      }
    });
  }
}
