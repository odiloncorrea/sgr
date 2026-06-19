import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map, of } from 'rxjs';

import { MoradorService } from '../../services/morador.service';
import { Morador } from '../../models/morador';

@Component({
  selector: 'app-morador-form',
  imports: [ReactiveFormsModule, RouterLink, NgxMaskDirective],
  templateUrl: './morador-form.html',
  styleUrl: './morador-form.css',
})
export class MoradorForm implements OnInit {

  mensagemErro = '';
  id?: string;
  formMorador: FormGroup;
  cpfOriginal = '';
  emailOriginal = '';

  constructor(private fb: FormBuilder, private moradorService: MoradorService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.formMorador = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)], [this.  
                validarCpfExistente()]],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], [this.validarEmailExistente()]],
      celular: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      contatos: ['', Validators.maxLength(1000)]
    });
    
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ?? undefined;
    
    if (this.id) {
      this.moradorService.buscarPorId(this.id).subscribe({
        next: (morador) => {
          this.cpfOriginal = morador.cpf;
          this.emailOriginal = morador.email;
          this.formMorador.patchValue(morador);
        },
        error: () => {
          this.mensagemErro = 'Erro ao carregar os dados do morador.';
        }
      });
    }
  }

  salvar(): void {
    if (this.formMorador.invalid) {
      this.formMorador.markAllAsTouched();
      return;
    }

    const morador: Morador = this.formMorador.value;
    morador.id = this.id ? Number(this.id) : undefined;

    this.moradorService.salvar(morador).subscribe({
      next: () => {
        this.router.navigate(['/moradores']);
      },
      error: () => {
        this.mensagemErro = 'Erro ao salvar morador.';
      }
    });
  }

  validarCampo(campo: string, erro: string): boolean {
    const controle = this.formMorador.get(campo);
    return !!(controle && controle.touched && controle.hasError(erro));
  }

  validarCpfExistente(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const cpf = control.value;

      if (!cpf || cpf.length !== 11 || cpf === this.cpfOriginal) {
        return of(null);
      }

      return this.moradorService.verificarCpf(cpf).pipe(
        map((existe) => existe ? { cpfExistente: true } : null)
      );
    };
  }

  validarEmailExistente(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;

      if (!email || email === this.emailOriginal) {
        return of(null);
      }

      return this.moradorService.verificarEmail(email).pipe(
        map((existe) => existe ? { emailExistente: true } : null)
      );
    };
  }

}