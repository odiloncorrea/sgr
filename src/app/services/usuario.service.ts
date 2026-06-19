import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService {

  //private readonly apiUrl = 'http://localhost:8080/usuarios';
  private readonly apiUrl = 'https://api-sgr.onrender.com/usuarios';
  
  constructor(private http: HttpClient) { }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  salvar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  alterarSenha(id: string, senha: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/senha?senha=${senha}`, null);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  verificarLogin(login: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-login?login=${login}`);
  }
}