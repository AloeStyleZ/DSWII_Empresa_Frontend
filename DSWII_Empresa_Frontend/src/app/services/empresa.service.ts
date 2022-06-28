import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { Observable } from "rxjs";
import {Empresa} from "../models/empresa.model";
import { AppSettings } from '../app.settings';

const baseUrl = 'http://localhost:8090/rest/rest/crudEmpresa';
const baseUrlEmpresa = AppSettings.API_ENDPOINT+ 'empresa';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService{
    constructor(private http:HttpClient){}

    listaEmpresa():Observable<Empresa[]>{
        return this.http.get<Empresa[]>(baseUrl+"/listaEmpresa");
    }

    listaEmpresaP(razonSocial:string, ruc:string, idUbigeo:number, idPais:number):Observable<any>{
        const params = new HttpParams().set("razonSocial", razonSocial).set("ruc",ruc).set("idUbigeo", idUbigeo).set("idPais", idPais);
        return this.http.get<any>(baseUrlEmpresa + "/porRucRaSocialUbigeoPaisConParametros", {params});
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