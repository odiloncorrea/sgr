import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioList implements OnInit {

  usuarios: Usuario[] = [];
  mensagemErro = '';

  usuarioSelecionado?: Usuario;
  formSenha: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {
    this.formSenha = this.fb.group({
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.usuarioService.listar().subscribe({
      next: (dados) => {
        this.usuarios = dados;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar a lista de usuários.';
      }
    });
  }

  abrirModalSenha(usuario: Usuario): void {
    this.usuarioSelecionado = usuario;
    this.formSenha.reset();
  }

  fecharModalSenha(): void {
    this.usuarioSelecionado = undefined;
    this.formSenha.reset();
  }

  alterarSenha(): void {
    if (this.formSenha.invalid || !this.usuarioSelecionado?.id) {
      this.formSenha.markAllAsTouched();
      return;
    }

    const senha = this.formSenha.get('senha')?.value;

    this.usuarioService.alterarSenha(
      this.usuarioSelecionado.id.toString(),
      senha
    ).subscribe({
      next: () => {
        this.fecharModalSenha();
      },
      error: () => {
        this.mensagemErro = 'Erro ao alterar senha.';
      }
    });
  }

  validarCampoSenha(campo: string, erro: string): boolean {
    const controle = this.formSenha.get(campo);
    return !!(controle && controle.touched && controle.hasError(erro));
  }

  excluir(id: number): void {
    if (!confirm('Deseja realmente excluir este usuário?')) {
      return;
    }

    this.usuarioService.excluir(id.toString()).subscribe({
      next: () => {
        this.listarUsuarios();
      },
      error: () => {
        this.mensagemErro = 'Erro ao excluir usuário.';
      }
    });
  }
}