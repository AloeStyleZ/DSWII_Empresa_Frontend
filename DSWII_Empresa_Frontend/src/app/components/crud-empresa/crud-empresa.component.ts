import { Component, OnInit } from "@angular/core";
import {Empresa} from 'src/app/models/empresa.model';
import { Ubigeo } from "src/app/models/ubigeo.model";
import { Pais } from "src/app/models/pais.model";
import {FormsModule} from "@angular/forms"
import { EmpresaService } from "src/app/services/empresa.service";
import { UbigeoService } from "src/app/services/ubigeo.service";
import { PaisService } from "src/app/services/pais.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector : 'app-consulta-empresa',
    templateUrl : './crud-empresa.component.html',
    styleUrls: ['./crud-empresa.component.css']
})
export class CrudEmpresaComponent implements OnInit{

    filtro: string = "";

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

    //empresa y pais
    empresas: Empresa[] = [];
    paises: Pais[] = [];

    empresa: Empresa = { 
        idEmpresa:0,
        razonSocial:"",
        ruc:"",
        gerente:"",
        ubigeo:{
          idUbigeo: 0,
          departamento:"-1",
          provincia:"-1",
          distrito:"-1",
        },
        pais:{
            idPais: -1
          }
      };
    
      formsRegistra = new FormGroup({
        validaRazonSocial: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
        validaRuc: new FormControl('', [Validators.required,Validators.pattern('[0-9]{11}')]),
        validaGerente: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
        validaDepartamento: new FormControl('', [Validators.min(1)]),
        validaProvincia: new FormControl('', [Validators.min(1)]),
        validaDistrito: new FormControl('', [Validators.min(1)]),
        validaPais: new FormControl('', [Validators.min(1)]),
      });

      submitted = false;

    constructor(private empresaService:EmpresaService, private ubigeoService: UbigeoService, private paisService: PaisService){
       this.ubigeoService.listarDepartamento().subscribe(
            (x)  => this.departamentos = x
        );
        this.paisService.listaPais().subscribe(
            (x) => this.paises = x
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


    consulta(){
        this.empresaService.consultaEmpresa(this.filtro == ""?"todos": this.filtro).subscribe(
            (x)=> this.empresas = x
        )
    }

    registra(){
        this.submitted = true;
    
          if (this.formsRegistra.invalid){
            return;
          }
    
        this.empresaService.registraEmpresa(this.empresa).subscribe(
          (x) => {
            this.submitted = false;
            alert(x.mensaje);
            this.consulta();
        }
        );
      }


    ngOnInit(): void {
        
    }

}