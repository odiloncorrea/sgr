import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Saldo } from '../models/saldo';
import { Extrato } from '../models/extrato';
import { FiltroExtrato } from '../models/filtro-extrato';
import { Grafico } from '../models/grafico';
import { ContaPendente } from '../models/conta-pendente';

@Injectable({
  providedIn: 'root',
})

export class RelatorioService {

  private readonly apiUrl = 'http://localhost:8080/relatorios';

  constructor(private http: HttpClient) { }

  consultarSaldo(): Observable<Saldo[]> {
    return this.http.get<Saldo[]>(`${this.apiUrl}/saldo`);
  }

  consultarExtrato(filtro: FiltroExtrato): Observable<Extrato[]> {
    let params = new HttpParams();

    if (filtro.dataInicio) {
      params = params.set('dataInicio', filtro.dataInicio);
    }

    if (filtro.dataFim) {
      params = params.set('dataFim', filtro.dataFim);
    }

    if (filtro.situacao) {
      params = params.set('situacao', filtro.situacao);
    }

    if (filtro.moradorId) {
      params = params.set('moradorId', filtro.moradorId);
    }

    return this.http.get<Extrato[]>(`${this.apiUrl}/extrato`, { params });
  }

  consultarGastosPorTipo(mes: number, ano: number): Observable<Grafico[]> {
    const params = new HttpParams()
      .set('mes', mes)
      .set('ano', ano);

    return this.http.get<Grafico[]>(`${this.apiUrl}/gastos-por-tipo`, { params });
  }

  consultarGastosPorMorador(mes: number, ano: number): Observable<Grafico[]> {
    const params = new HttpParams()
      .set('mes', mes)
      .set('ano', ano);

    return this.http.get<Grafico[]>(`${this.apiUrl}/gastos-por-morador`, { params });
  }

  consultarContasPendentes(mes: number, ano: number): Observable<ContaPendente[]> {
    const params = new HttpParams()
      .set('mes', mes)
      .set('ano', ano);

    return this.http.get<ContaPendente[]>(`${this.apiUrl}/contas-pendentes`, { params });
  }
}