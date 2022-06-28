import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrudEmpresaComponent } from './components/crud-empresa/crud-empresa.component';
import { ConsultaEmpresaComponent } from './components/consulta-empresa/consulta-empresa.component';


const routes: Routes = [
  {path:"crudEmpresa", component:CrudEmpresaComponent },
  {path:"consultaEmpresa", component:ConsultaEmpresaComponent },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }