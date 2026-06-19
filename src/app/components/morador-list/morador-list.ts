import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Morador } from '../../models/morador';
import { MoradorService } from '../../services/morador.service';
import { CpfPipe } from '../../pipes/cpf-pipe';

@Component({
  selector: 'app-morador-list',
  imports: [RouterLink, DatePipe, CpfPipe],
  templateUrl: './morador-list.html',
  styleUrl: './morador-list.css',
})
export class MoradorList implements OnInit {
  moradores: Morador[] = [];
  mensagemErro = '';

  constructor(private moradorService: MoradorService) { }

  ngOnInit(): void {
    this.listarMoradores();
  }

  listarMoradores(): void {
    this.moradorService.listar().subscribe({
      next: (dados) => {

        this.moradores = dados;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar a lista de moradores.';
      }
    });
  }

  excluir(id: number): void {
    if (!confirm('Deseja realmente excluir este morador?')) {
      return;
    }

    this.moradorService.excluir(id.toString()).subscribe({
      next: () => {
        this.listarMoradores();
      },
      error: () => {
        this.mensagemErro = 'Erro ao excluir morador.';
      }
    });
  }
}