import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEnpoint: string = 'http://localhost:8080/api/facturas';

  constructor(private http : HttpClient) { }

  getFactura(id:number):Observable<Factura>{
    return this.http.get<Factura>(`${this.urlEnpoint}/${id}`);
  }

  delete(id: number):Observable<void>{
    return this.http.delete<void>(`${this.urlEnpoint}/${id}`);
  }
  filtrarProductos(term:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEnpoint}/filtrar-productos/${term}`);
  }

  create(factura:Factura):Observable<Factura>{
    return this.http.post<Factura>(this.urlEnpoint,factura);   
  }
}
