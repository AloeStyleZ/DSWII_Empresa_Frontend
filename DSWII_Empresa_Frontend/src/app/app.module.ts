import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudEmpresaComponent } from './components/crud-empresa/crud-empresa.component';
import { ConsultaEmpresaComponent } from './components/consulta-empresa/consulta-empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudEmpresaComponent,
    ConsultaEmpresaComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }