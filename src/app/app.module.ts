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
import { SessionAddComponent } from './FrontOffice/viewsFront/raba3/session-add/session-add.component';
import { GameListComponent } from './FrontOffice/viewsFront/raba3/game-list/game-list.component';
import { SessionListComponent } from './FrontOffice/viewsFront/raba3/session-list/session-list.component';
import { HttpClientModule } from '@angular/common/http';
import { GameAddComponent } from './BackOffice/viewsBack/raba3/game-add/game-add.component';
import { GameEditComponent } from './BackOffice/viewsBack/raba3/game-edit/game-edit.component';
import { GameListBComponent } from './BackOffice/viewsBack/raba3/game-list-b/game-list-b.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionListBComponent } from './BackOffice/viewsBack/raba3/session-list-b/session-list-b.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'
import { UserSessionsComponent } from './FrontOffice/viewsFront/raba3/user-sessions/user-sessions.component';
import { environment } from 'src/environements/environement';
import {initializeApp} from 'firebase/app';

initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    AllTemplatesBackComponent,
    AllTemplatesFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    SessionAddComponent,
    GameListComponent,
    SessionListComponent,
    GameAddComponent,
    GameEditComponent,
    GameListBComponent,
    SessionListBComponent,
    UserSessionsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
