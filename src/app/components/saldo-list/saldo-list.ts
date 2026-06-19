import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Saldo } from '../../models/saldo';
import { RelatorioService } from '../../services/relatorio.service';

@Component({
  selector: 'app-saldo-list',
  imports: [CurrencyPipe],
  templateUrl: './saldo-list.html',
  styleUrl: './saldo-list.css',
})
export class SaldoList implements OnInit {

  saldos: Saldo[] = [];
  mensagemErro = '';

  constructor(private relatorioService: RelatorioService) { }

  ngOnInit(): void {
    this.consultarSaldo();
  }

  consultarSaldo(): void {
    this.relatorioService.consultarSaldo().subscribe({
      next: (dados) => {
        this.saldos = dados;
      },
      error: () => {
        this.mensagemErro = 'Erro ao consultar saldo.';
      }
    });
  }
}