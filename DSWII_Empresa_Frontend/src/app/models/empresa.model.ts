import { Pais } from "./pais.model";
import { Ubigeo } from "./ubigeo.model";

export class Empresa {
    idEmpresa?:number;
	razonSocial?:string;
    gerente ?: string; 
    ruc ?: string;
    ubigeo ?: Ubigeo;
    pais ?: Pais;
}
