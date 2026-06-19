import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Morador } from '../models/morador';

@Injectable({
  providedIn: 'root'
})
export class MoradorService {

  //  private readonly apiUrl = 'http://localhost:8080/moradores';
  private readonly apiUrl = 'https://api-sgr.onrender.com/moradores';


  constructor(private http: HttpClient) { }

  listar(): Observable<Morador[]> {
    return this.http.get<Morador[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Morador> {
    return this.http.get<Morador>(`${this.apiUrl}/${id}`);
  }

  salvar(morador: Morador): Observable<Morador> {
    if (morador.id) {
      return this.http.put<Morador>(`${this.apiUrl}/${morador.id}`, morador);
    }

    return this.http.post<Morador>(this.apiUrl, morador);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  verificarEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-email`, {
      params: { email }
    });
  }

  verificarCpf(cpf: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-cpf`, {
      params: { cpf }
    });
  }
}