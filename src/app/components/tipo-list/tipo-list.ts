import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Tipo } from '../../models/tipo';
import { TipoService } from '../../services/tipo.service';

@Component({
  selector: 'app-tipo-list',
  imports: [RouterLink],
  templateUrl: './tipo-list.html',
  styleUrl: './tipo-list.css',
})
export class TipoList implements OnInit {

    tipos: Tipo[] = [];
    mensagemErro = '';

  constructor(private tipoService: TipoService) { }

  ngOnInit(): void {
    this.listarTipos();
  }

  listarTipos(): void {
    this.tipoService.listar().subscribe({
      next: (dados) => {

        this.tipos = dados;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar a lista de tipos.';
      }
    });
  }

  excluir(id: number): void {
    if (!confirm('Deseja realmente excluir este tipo?')) {
      return;
    }

    this.tipoService.excluir(id.toString()).subscribe({
      next: () => {
        this.listarTipos();
      },
      error: () => {
        this.mensagemErro = 'Erro ao excluir tipo.';
      }
    });
  }  

}
