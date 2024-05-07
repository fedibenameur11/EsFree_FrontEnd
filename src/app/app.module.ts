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
import { CollocationListComponent } from './FrontOffice/viewsFront/colocation/collocation-list/collocation-list.component';
import { LoginComponent } from './Login/login/login.component';
import { JwtModule } from "@auth0/angular-jwt";
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CustomInterceptor } from './Service/custom.interceptor';
import { GUserComponent } from './BackOffice/viewsBack/user/g-user/g-user.component';
import { SignuppComponent } from './Login/signupp/signupp.component';


import { ProfileComponent } from './Login/profile/profile.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ForgetpwdComponent } from './Login/forgetpwd/forgetpwd.component';




@NgModule({
  declarations: [
    AppComponent,
    AllTemplatesBackComponent,
    AllTemplatesFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    LoginComponent,
    GUserComponent,
    SignuppComponent,
    ProfileComponent,
    ForgetpwdComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, 
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
   
  ],
  providers: [ 
//{ 
//provide : HTTP_INTERCEPTORS ,
 // useClass : CustomInterceptor ,
  //  multi : true
// } 
],
  bootstrap: [AppComponent]
})
export class AppModule { }
