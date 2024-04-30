import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplatesBackComponent } from './BackOffice/all-templates-back/all-templates-back.component';
import { AllTemplatesFrontComponent } from './FrontOffice/all-templates-front/all-templates-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaisonlistComponent } from './FrontOffice/viewsFront/maison/maisonlist/maisonlist.component';
import { ContratLocationlistComponent } from './FrontOffice/viewsFront/contratLocation/contrat-locationlist/contrat-locationlist.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaisonlistbackComponent } from './BackOffice/viewsBack/maison/maisonlist/maisonlist.component';
import { MaisondetailComponent } from './FrontOffice/viewsFront/maison/maisondetail/maisondetail.component';
import { MaisondetailbackComponent } from './BackOffice/viewsBack/maison/maisondetailback/maisondetailback.component';


@NgModule({
  declarations: [
    AppComponent,
    AllTemplatesBackComponent,
    AllTemplatesFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    MaisonlistComponent,
    ContratLocationlistComponent,
    MaisonlistbackComponent,
    MaisondetailComponent,
    MaisondetailbackComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
