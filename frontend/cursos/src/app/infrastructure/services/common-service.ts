/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Generic } from '@domain/models/generic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class CommonService<E extends Generic> {
  protected baseEndpoint!: string;
  protected cabeceras: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  protected http = inject(HttpClient);
  public listar(): Observable<E[]> {
    return this.http.get<E[]>(this.baseEndpoint);
  }

  public listarPaginas(page: string, size: string): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.baseEndpoint}/pagina`, {
      params: params,
    });
  }

  public ver(id: number): Observable<E> {
    return this.http.get<E>(`${this.baseEndpoint}/${id}`);
  }

  public crear(e: E): Observable<E> {
    return this.http.post<E>(this.baseEndpoint, e, { headers: this.cabeceras });
  }

  public editar(e: E): Observable<E> {
    return this.http.put<E>(`${this.baseEndpoint}/${e.id}`, e, {
      headers: this.cabeceras,
    });
  }

  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
