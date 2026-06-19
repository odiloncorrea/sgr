import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Credencial } from '../../models/credencial';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

  mensagemErro = '';
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  entrar(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    const credencial: Credencial = this.formLogin.value;

    this.autenticacaoService.login(credencial).subscribe({
      next: (usuario) => {
        this.autenticacaoService.salvarUsuario(usuario);
        this.router.navigate(['/']);
      },
      error: () => {
        this.mensagemErro = 'Login ou senha inválidos.';
      }
    });
  }

  validarCampo(campo: string, erro: string): boolean {
    const controle = this.formLogin.get(campo);
    return !!(controle && controle.touched && controle.hasError(erro));
  }
}