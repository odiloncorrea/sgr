import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';


import { Tipo } from '../../models/tipo';
import { TipoService } from '../../services/tipo.service';


@Component({
  selector: 'app-tipo-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './tipo-form.html',
  styleUrl: './tipo-form.css',
})
export class TipoForm implements OnInit {

  mensagemErro = '';
  id?: string;
  formTipo: FormGroup;

  constructor(private fb: FormBuilder, private tipoService: TipoService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.formTipo = this.fb.group({
      descricao: ['', [Validators.required]]
    });
    
  }
  
  
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ?? undefined;
    
    if (this.id) {
      this.tipoService.buscarPorId(this.id).subscribe({
        next: (dados) => {
          this.formTipo.patchValue(dados);
        },
        error: () => {
          this.mensagemErro = 'Erro ao carregar os dados do tipo.';
        }
      });
    }
  }  

  salvar(): void {
    if (this.formTipo.invalid) {
      this.formTipo.markAllAsTouched();
      return;
    }

    const tipo: Tipo = this.formTipo.value;
    tipo.id = this.id ? Number(this.id) : undefined;

    this.tipoService.salvar(tipo).subscribe({
      next: () => {
        this.router.navigate(['/tipos']);
      },
      error: () => {
        this.mensagemErro = 'Erro ao salvar tipo.';
      }
    });
  }

  validarCampo(campo: string, erro: string): boolean {
    const controle = this.formTipo.get(campo);
    return !!(controle && controle.touched && controle.hasError(erro));
  }  

}
