import { Component, OnInit } from "@angular/core";
import {Empresa} from 'src/app/models/empresa.model';
import { Ubigeo } from "src/app/models/ubigeo.model";
import { Pais } from "src/app/models/pais.model";
import { EmpresaService } from "src/app/services/empresa.service";
import { UbigeoService } from "src/app/services/ubigeo.service";
import { PaisService } from "src/app/services/pais.service";


@Component({
    selector : 'app-consulta-empresa',
    templateUrl : './consulta-empresa.component.html',
    styleUrls: ['./consulta-empresa.component.css']
})
export class ConsultaEmpresaComponent implements OnInit{

    //
    razonSocial:string="";
    gerente:string="";
    ruc:string="";
    selDepartamento:string = "-1";
    selProvincia:string = "-1";
    selDistrito:number = -1;
    selPais:number = -1;

    //
    departamentos: string[] = [];
    provincias: string[] = [];
    distritos: Ubigeo[] = [];

    //
    empresas: Empresa[] = [];
    paises: Pais[] = [];

    constructor(private ubigeoService: UbigeoService,private empresaService:EmpresaService){
        ubigeoService.listarDepartamento().subscribe(
            (x) => this.departamentos = x
        );
    }

    cargaProvincia(){
        this.ubigeoService.listaProvincias(this.selDepartamento).subscribe(

            (x) => this.provincias = x

        );
        this.selProvincia = "-1";
        this.distritos = [];
        this.selDistrito = -1;
    }

    cargaDistrito(){
        this.ubigeoService.listaDistritos(this.selDepartamento, this.selProvincia).subscribe(
            (x) => this.distritos = x
        )
        this.selDistrito = -1;
    }

    consultaEmpresa(){
       /* this.empresaService.consultaEmpresa(this.raSocial, this.ruc, this.selDistrito, this.selPais).subscribe(
            (x) => {
                this.empresas = x
                alert(x.mensaje);
            }

        )*/
    }

   

    ngOnInit(): void {
        
    }

}