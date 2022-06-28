import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais.model';

const baseUrlUtil = 'http://localhost:8080/rest/util';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
 
  constructor(private http:HttpClient) { }


  listaPais():Observable<Pais[]>{
    return this.http.get<Pais[]>(baseUrlUtil+"/listaPais");
  }
  listaPais1():Observable<string[]>{
    return this.http.get<string[]>(baseUrlUtil+"/listaPais");
  }
}

