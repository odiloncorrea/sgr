import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Conta } from '../models/conta';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private readonly apiUrl = 'http://localhost:8080/contas';

  constructor(private http: HttpClient) { }

  listar(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Conta> {
    return this.http.get<Conta>(`${this.apiUrl}/${id}`);
  }

  salvar(conta: Conta): Observable<Conta> {
    if (conta.id) {
      return this.http.put<Conta>(`${this.apiUrl}/${conta.id}`, conta);
    }

    return this.http.post<Conta>(this.apiUrl, conta);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}