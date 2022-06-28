import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { Pais } from "src/app/models/pais.model";
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PaisService } from "src/app/services/pais.service";


@Component({
  selector: 'app-registra-empresa',
  templateUrl: './registra-empresa.component.html',
  styleUrls: ['./registra-empresa.component.css']
})
export class RegistraEmpresaComponent implements OnInit {


//Variables globales

departamentos: string[] = [];
provincias: string[] = [];
distritos: Ubigeo[] = [];

paises: Pais[] = [];
//variables seleccionadas

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
  constructor(private empresaService:EmpresaService, private ubigeoService: UbigeoService, private paisService: PaisService){
    this.ubigeoService.listaDepartamentos().subscribe(
        (x)  => this.departamentos = x
     );
     this.paisService.listaPais().subscribe(
        (x) => this.paises = x
     ); 
 }

cargaProvincia(){ 
  console.log(">>> Carga Provincia >> ");
console.log(">>> Departamento >>" + this.empresa.ubigeo?.departamento);


  this.ubigeoService.listaProvincias(this.empresa.ubigeo?.departamento).subscribe(
    (x) => this.provincias = x
    );
    this.empresa.ubigeo!.provincia="-1";
    this.distritos = [];
    this.empresa.ubigeo!.idUbigeo=-1;
}
cargaDistrito(){ 
  console.log(">>> Carga Distrito >> ");
  console.log(">>> Departamento >>" + this.empresa.ubigeo?.departamento);
  console.log(">>> Provincia >>" + this.empresa.ubigeo?.provincia);
  

  this.ubigeoService.listaDistritos(this.empresa.ubigeo?.departamento, this.empresa.ubigeo?.provincia).subscribe(
    (x) => this.distritos = x
    );

    this.empresa.ubigeo!.idUbigeo= -1;
}

insertado(){
  this.empresaService.registraEmpresa(this.empresa).subscribe(
    (x) => alert(x.mensaje)
  );
}
  ngOnInit(): void {
  }

}
