import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink} from '@angular/router';

import { Extrato } from '../../models/extrato';
import { Morador } from '../../models/morador';

import { RelatorioService } from '../../services/relatorio.service';
import { MoradorService } from '../../services/morador.service';

@Component({
  selector: 'app-extrato-list',
  imports: [ReactiveFormsModule, DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './extrato-list.html',
  styleUrl: './extrato-list.css',
})
export class ExtratoList implements OnInit {

  extratos: Extrato[] = [];
  moradores: Morador[] = [];

  mensagemErro = '';

  formFiltro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private relatorioService: RelatorioService,
    private moradorService: MoradorService
  ) {
    this.formFiltro = this.fb.group({
      dataInicio: [''],
      dataFim: [''],
      situacao: [''],
      moradorId: ['']
    });
  }

  ngOnInit(): void {
    this.carregarMoradores();
  }

  carregarMoradores(): void {
    this.moradorService.listar().subscribe({
      next: (moradores) => {
        this.moradores = moradores;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar moradores.';
      }
    });
  }

  consultar(): void {
    const filtro = this.formFiltro.value;

    this.relatorioService.consultarExtrato(filtro).subscribe({
      next: (dados) => {
        this.extratos = dados;
      },
      error: () => {
        this.mensagemErro = 'Erro ao consultar extrato.';
      }
    });
  }
}