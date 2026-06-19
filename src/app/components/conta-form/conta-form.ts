import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

import { ContaService } from '../../services/conta.service';
import { MoradorService } from '../../services/morador.service';
import { TipoService } from '../../services/tipo.service';

import { Conta } from '../../models/conta';
import { Rateio } from '../../models/rateio';
import { Morador } from '../../models/morador';
import { Tipo } from '../../models/tipo';

@Component({
  selector: 'app-conta-form',
  imports: [ReactiveFormsModule, RouterLink, NgxMaskDirective, CurrencyPipe],
  templateUrl: './conta-form.html',
  styleUrl: './conta-form.css',
})
export class ContaForm implements OnInit {

  mensagemErro = '';
  id?: string;
  duplicando = false;

  conta?: Conta;

  moradores: Morador[] = [];
  tipos: Tipo[] = [];
  rateios: Rateio[] = [];

  formConta: FormGroup;
  formRateio: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private moradorService: MoradorService,
    private tipoService: TipoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formConta = this.fb.group({
      descricao: ['', [Validators.maxLength(255)]],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      vencimento: ['', Validators.required],
      situacao: ['PENDENTE', Validators.required],
      observacao: ['', Validators.maxLength(2000)],
      tipoContaId: ['', Validators.required],
      moradorResponsavelId: ['', Validators.required]
    });

    this.formRateio = this.fb.group({
      moradorId: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      situacao: ['EM_ABERTO', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarMoradores();
    this.carregarTipos();

    this.id = this.activatedRoute.snapshot.paramMap.get('id') ?? undefined;
    this.duplicando = this.router.url.includes('/duplicar');

    if (this.id) {
      this.contaService.buscarPorId(this.id).subscribe({
        next: (conta) => {
          this.conta = conta;

          this.formConta.patchValue({
            descricao: conta.descricao,
            valor: conta.valor,
            vencimento: conta.vencimento,
            situacao: this.duplicando ? 'PENDENTE' : conta.situacao,
            observacao: conta.observacao,
            tipoContaId: conta.tipoContaId,
            moradorResponsavelId: conta.moradorResponsavelId
          });

          this.rateios = (conta.rateios ?? []).map(rateio => ({
            id: this.duplicando ? undefined : rateio.id,
            moradorId: rateio.moradorId,
            moradorNome: rateio.moradorNome,
            valor: rateio.valor,
            situacao: this.duplicando ? 'EM_ABERTO' : rateio.situacao
          }));

          if (!this.duplicando) {
            this.bloquearCampos();
          }
        },
        error: () => {
          this.mensagemErro = 'Erro ao carregar os dados da conta.';
        }
      });
    }
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

  carregarTipos(): void {
    this.tipoService.listar().subscribe({
      next: (tipos) => {
        this.tipos = tipos;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar tipos de conta.';
      }
    });
  }

  adicionarRateio(): void {
    if (this.formRateio.invalid) {
      this.formRateio.markAllAsTouched();
      return;
    }

    const rateio: Rateio = this.formRateio.value;

    rateio.valor = this.converterValor(rateio.valor);
    rateio.moradorNome = this.buscarNomeMorador(rateio.moradorId);

    this.rateios.push(rateio);

    this.formRateio.reset({
      moradorId: '',
      valor: '',
      situacao: 'EM_ABERTO'
    });
  }

  removerRateio(index: number): void {
    this.rateios.splice(index, 1);
  }

  ratearConta(): void {
    const valorConta = this.converterValor(this.formConta.get('valor')?.value);

    if (!valorConta || this.moradores.length === 0) {
      return;
    }

    const valorRateio = Number((valorConta / this.moradores.length).toFixed(2));

    this.rateios = this.moradores.map(morador => ({
      moradorId: morador.id!,
      moradorNome: morador.nome,
      valor: valorRateio,
      situacao: 'EM_ABERTO'
    }));
  }

  salvar(): void {
    if (this.formConta.invalid) {
      this.formConta.markAllAsTouched();
      return;
    }

    const conta: Conta = this.formConta.getRawValue();

    conta.valor = this.converterValor(conta.valor);

    conta.rateios = this.rateios.map(rateio => ({
      id: this.duplicando ? undefined : rateio.id,
      moradorId: rateio.moradorId,
      moradorNome: rateio.moradorNome,
      valor: this.converterValor(rateio.valor),
      situacao: rateio.situacao
    }));

    conta.id = this.duplicando ? undefined : this.id ? Number(this.id) : undefined;

    this.contaService.salvar(conta).subscribe({
      next: () => {
        this.router.navigate(['/contas']);
      },
      error: () => {
        this.mensagemErro = 'Erro ao salvar conta.';
      }
    });
  }

  validarCampo(campo: string, erro: string): boolean {
    const controle = this.formConta.get(campo);
    return !!(controle && controle.touched && controle.hasError(erro));
  }

  validarCampoRateio(campo: string, erro: string): boolean {
    const controle = this.formRateio.get(campo);
    return !!(controle && controle.touched && controle.hasError(erro));
  }

  buscarNomeMorador(id: number): string {
    const morador = this.moradores.find(m => m.id === Number(id));
    return morador ? morador.nome : '';
  }

  contaBloqueada(): boolean {
    if (this.duplicando) {
      return false;
    }

    return this.conta?.situacao === 'QUITADA' || this.conta?.situacao === 'CANCELADA';
  }

  bloquearCampos(): void {
    if (this.contaBloqueada()) {
      this.formConta.disable();
      this.formConta.get('situacao')?.enable();

      this.formRateio.disable();
    }
  }

  converterValor(valor: any): number {
    if (valor === null || valor === undefined || valor === '') {
      return 0;
    }

    if (typeof valor === 'number') {
      return valor;
    }

    return Number(valor.toString().replace(/\./g, '').replace(',', '.'));
  }
}