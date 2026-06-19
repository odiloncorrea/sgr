import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Usuario } from '../../models/usuario';
import { Morador } from '../../models/morador';

import { UsuarioService } from '../../services/usuario.service';
import { MoradorService } from '../../services/morador.service';

@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css',
})
export class UsuarioForm implements OnInit {

  mensagemErro = '';
  moradores: Morador[] = [];

  formUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private moradorService: MoradorService,
    private router: Router
  ) {
    this.formUsuario = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      perfil: ['', Validators.required],
      moradorId: ['', Validators.required]
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

  salvar(): void {
    if (this.formUsuario.invalid) {
      this.formUsuario.markAllAsTouched();
      return;
    }

    const usuario: Usuario = this.formUsuario.value;

    this.usuarioService.salvar(usuario).subscribe({
      next: () => {
        this.router.navigate(['/usuarios']);
      },
      error: () => {
        this.mensagemErro = 'Erro ao salvar usuário.';
      }
    });
  }

  validarCampo(campo: string, erro: string): boolean {
    const controle = this.formUsuario.get(campo);
    return !!(controle && controle.touched && controle.hasError(erro));
  }
}