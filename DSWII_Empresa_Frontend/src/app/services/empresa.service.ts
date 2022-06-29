import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { Observable } from "rxjs";
import {Empresa} from "../models/empresa.model";
import { AppSettings } from '../app.settings';


const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlEmpresa = AppSettings.API_ENDPOINT+ '/empresa';
const baseUrlCrudEmpresa = AppSettings.API_ENDPOINT+ '/crudEmpresa';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService{
    constructor(private http:HttpClient){}

    /*listaEmpresa():Observable<Empresa[]>{
        return this.http.get<Empresa[]>(baseUrlUtil+"/listaEmpresa");
    }*/

    listaEmpresaP(razonSocial:string, ruc:string, idUbigeo:number, idPais:number):Observable<any>{
        const params = new HttpParams().set("razonSocial", razonSocial).set("ruc",ruc).set("idUbigeo", idUbigeo).set("idPais", idPais);
        return this.http.get<any>(baseUrlEmpresa + "/porRucRaSocialUbigeoPaisConParametros", {params});
    }

    listaEmpresaRazon(filtro : any): Observable<any>
    {
        return this.http.get(baseUrlCrudEmpresa + "/listaEmpresaPorNombreLike/" + filtro);
    }

    registraEmpresa(vj : Empresa): Observable<any>{
        return this.http.post(baseUrlCrudEmpresa+"/registraEmpresa", vj);
    }

    actualizaEmpresa(vj : Empresa): Observable<any>{
        return this.http.put(baseUrlCrudEmpresa+"/actualizaEmpresa", vj);
    }
    eliminaEmpresa(id : any): Observable<any>{
        return this.http.delete(baseUrlCrudEmpresa + "/eliminaProveedor/"+ id);
     } 

}