import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { Observable } from "rxjs";
import {Empresa} from "../models/empresa.model";

const baseUrl = 'http://localhost:8090/rest/rest/crudEmpresa';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService{
    constructor(private http:HttpClient){}

    listaEmpresa():Observable<Empresa[]>{
        return this.http.get<Empresa[]>(baseUrl+"/listaEmpresa");
    }

    consultaEmpresa(filtro : any): Observable<any>
    {
        return this.http.get(baseUrl + "/listaEmpresaPorNombreLike/" + filtro);
    }

    registraEmpresa(aux : Empresa): Observable<any>{
        return this.http.post("/registraEmpresa", aux);
    }

    actualizaEmpresa(aux : Empresa): Observable<any>{
        return this.http.put("/actualizaEmpresa", aux);
    }

}