import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { RouterLink } from '@angular/router';

import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
Chart.register(...registerables);

import { RelatorioService } from '../../services/relatorio.service';
import { ContaPendente } from '../../models/conta-pendente';

@Component({
  selector: 'app-painel',
  imports: [FormsModule, BaseChartDirective, CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel implements OnInit {

  mensagemErro = '';

  mes = new Date().getMonth() + 1;
  ano = new Date().getFullYear();

  contasPendentes: ContaPendente[] = [];

  tipoGraficoBarra: ChartType = 'bar';
  tipoGraficoPizza: ChartType = 'pie';

  dadosGastosPorTipo: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Gastos por tipo',
        data: []
      }
    ]
  };

  dadosGastosPorMorador: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  };

  opcoesGraficoBarra: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  opcoesGraficoPizza: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private relatorioService: RelatorioService) { }

  ngOnInit(): void {
    this.consultar();
  }

  consultar(): void {
    this.mensagemErro = '';

    this.consultarGastosPorTipo();
    this.consultarGastosPorMorador();
    this.consultarContasPendentes();
  }

  consultarGastosPorTipo(): void {
    this.relatorioService.consultarGastosPorTipo(this.mes, this.ano).subscribe({
      next: (dados) => {
        this.dadosGastosPorTipo = {
          labels: dados.map(item => item.descricao),
          datasets: [
            {
              label: 'Gastos por tipo',
              data: dados.map(item => item.valor)
            }
          ]
        };
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar gastos por tipo.';
      }
    });
  }

  consultarGastosPorMorador(): void {
    this.relatorioService.consultarGastosPorMorador(this.mes, this.ano).subscribe({
      next: (dados) => {
        this.dadosGastosPorMorador = {
          labels: dados.map(item => item.descricao),
          datasets: [
            {
              data: dados.map(item => item.valor)
            }
          ]
        };
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar gastos por morador.';
      }
    });
  }

  consultarContasPendentes(): void {
    this.relatorioService.consultarContasPendentes(this.mes, this.ano).subscribe({
      next: (dados) => {
        this.contasPendentes = dados;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar contas pendentes.';
      }
    });
  }
}