import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tipo } from '../models/tipo';

@Injectable({
  providedIn: 'root',
})
export class TipoService {

  //private readonly apiUrl = 'http://localhost:8080/tipos';
  private readonly apiUrl = 'https://api-sgr.onrender.com/tipos';


  constructor(private http: HttpClient) { }

  listar(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Tipo> {
    return this.http.get<Tipo>(`${this.apiUrl}/${id}`);
  }

  salvar(tipo: Tipo): Observable<Tipo> {
    if (tipo.id) {
      return this.http.put<Tipo>(`${this.apiUrl}/${tipo.id}`, tipo);
    }

    return this.http.post<Tipo>(this.apiUrl, tipo);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
