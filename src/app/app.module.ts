import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // tener el AppRoutingModule
import { AppComponent } from './app.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormComponent } from './components/form/form.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';


import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { RecursoComponent } from './components/crud/recurso/recurso.component';
import { ProyectoComponent } from './components/crud/proyecto/proyecto.component';
import { NotificacionComponent } from './components/crud/notificacion/notificacion.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { Grafico2Component } from './comoponents/grafico2/grafico2.component';

export const routes: Routes = [
  { path: '', redirectTo: '/recurso', pathMatch: 'full' },
  { path: 'recurso', component: FormComponent },
  { path: 'proyecto', component: FormComponent },
  { path: 'notificacion', component: FormComponent },
  { path: 'tiempo1', component: GraficoComponent },
  { path: 'tiempo2', component: GraficoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    FormComponent,
    RecursoComponent,
    ProyectoComponent,
    NotificacionComponent,
    TablaComponent,
    GraficoComponent,
    Grafico2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    MenubarModule,
    MessagesModule,
    TableModule,
    ChartModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
