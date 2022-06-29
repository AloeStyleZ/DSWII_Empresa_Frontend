import { Component, OnInit } from "@angular/core";
import {Empresa} from 'src/app/models/empresa.model';
import { Ubigeo } from "src/app/models/ubigeo.model";
import { Pais } from "src/app/models/pais.model";
import { FormsModule } from "@angular/forms";
import { EmpresaService } from "src/app/services/empresa.service";
import { UbigeoService } from "src/app/services/ubigeo.service";
import { PaisService } from "src/app/services/pais.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector : 'app-crud-empresa',
    templateUrl : './crud-empresa.component.html',
    styleUrls: ['./crud-empresa.component.css']
})
export class CrudEmpresaComponent implements OnInit{

  empresas: Empresa[] = [];

    filtro: string = "";

    //
    departamentos: string[] = [];
    provincias: string[] = [];
    distritos: Ubigeo[] = [];

    //empresa y pais
   
    paises: Pais[] = [];

    empresa: Empresa = { 
        idEmpresa:0,
        razonSocial:"",
        ruc:"",
        gerente:"",
        ubigeo:{
          idUbigeo: -1,
          departamento:"",
          provincia:"",
          distrito:"",
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

      formsActualiza = new FormGroup({
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
      this.paisService.listaPais().subscribe(
        response => this.paises = response
      ); 

      this.ubigeoService.listaDepartamentos().subscribe(
            response  => this.departamentos = response
        );
        
    }

    cargaProvincia(){
      this.ubigeoService.listaProvincias(this.empresa.ubigeo?.departamento).subscribe(
        response =>  this.provincias= response
      );
  
      this.empresa!.ubigeo!.provincia = "-1";
      this.distritos = [];
      this.empresa!.ubigeo!.idUbigeo = -1;
  
  }
  
  cargaDistrito(){
    this.ubigeoService.listaDistritos(this.empresa.ubigeo?.departamento, this.empresa.ubigeo?.provincia).subscribe(
      response =>  this.distritos= response
     );
  
     this.empresa!.ubigeo!.idUbigeo = -1;
   }




    consulta(){
        this.empresaService.listaEmpresaRazon(this.filtro == ""?"todos": this.filtro).subscribe(
            (x)=> this.empresas = x
        )
    }

    registra() {
      this.submitted = true;
  
      //finaliza el método si hay un error
      if (this.formsRegistra.invalid) {
        return;
       }
  
      this.submitted = false;
  
      this.empresaService.registraEmpresa(this.empresa).subscribe(
        (x) => {  
          this.empresaService.listaEmpresaRazon(this.filtro == "" ? "todos" : this.filtro).subscribe(
            (x) => this.empresas = x
          );
          this.submitted = false;
          alert(x.mensaje);
        }
      );
  
      //limpiar los comobobox
      this.distritos = [];
      this.provincias = [];
  
      //limpiar los componentes del formulario a través de los ngModel
  
      this.empresa = {
        idEmpresa:0,
        razonSocial:"",
        ruc:"",
        gerente:"",
        ubigeo:{
          idUbigeo: -1,
          departamento:"",
          provincia:"",
          distrito:"",
        },
        pais:{
            idPais: -1
          }
      }
    }
     /*registra(){
        this.empresaService.registraEmpresa(this.empresa).subscribe(
          (x) => {
            document.getElementById("btn_reg_limpiar")?.click();
            document.getElementById("btn_reg_cerrar")?.click();
            alert(x.mensaje);
            this.empresaService.consultaEmpresa(this.filtro==""?"todos":this.filtro).subscribe(
                    (x) => this.empresas = x
            );
          } 
      );
       this.distritos = [];
       this.provincias = [];
       this.empresa = { 
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
      }
      }*/

      busca(aux:Empresa){
        this.empresa=aux;
        this.ubigeoService.listaProvincias(this.empresa.ubigeo?.departamento).subscribe(
          response =>  this.provincias= response
        );
        this.ubigeoService.listaDistritos(this.empresa.ubigeo?.departamento, this.empresa.ubigeo?.provincia).subscribe(
          response =>  this.distritos= response
         );
      }
  

      /*actualiza(){
        this.submitted = true;
    
        if (this.formsActualiza.invalid){
          return;
        }
        this.empresaService.actualizaEmpresa(this.empresa).subscribe(
          (x) => {
            this.submitted = false;
            alert(x.mensaje);
            this.consulta();
        }
        );
      }*/

      actualiza(){
        this.empresaService.actualizaEmpresa(this.empresa).subscribe(
          (x) => {
            document.getElementById("btn_act_limpiar")?.click();
            document.getElementById("btn_act_cerrar")?.click();
            alert(x.mensaje);
            this.empresaService.listaEmpresaRazon(this.filtro==""?"todos":this.filtro).subscribe(
                    (x) => this.empresas = x
            );
          } 
      );
      
      this.distritos = [];
      this.provincias = [];
      
      
      this.empresa = { 
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
      }
      }


      elimina(aux:Empresa){
        this.empresaService.eliminaEmpresa(aux.idEmpresa).subscribe(
          (x) => {
            alert(x.mensaje);
        this.empresaService.listaEmpresaRazon(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.empresa = x
          );
        } 
      );
      } 

    ngOnInit(): void {
        
    }

}