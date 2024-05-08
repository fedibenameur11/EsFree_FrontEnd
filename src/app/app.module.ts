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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { filter } from 'rxjs';
import { StatsComponent } from './FrontOffice/viewsFront/raba3/stats/stats.component';
import { HomeComponent } from './FrontOffice/viewsFront/home/home/home.component';
import { HomebComponent } from './BackOffice/viewsBack/homeb/homeb.component';



@NgModule({
  declarations: [
    AppComponent,
    AllTemplatesBackComponent,
    AllTemplatesFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    EventListComponent,
    EventListFrontComponent,
    EventAddFrontComponent,
    EventDetailFrontComponent,
    EventCalendarComponent,
    ParticipationListFrontComponent,
    ParticipationListComponent,
    EventListUserComponent,
    StatEventComponent,
    PubitemComponent,
    CartComponent,
    MarketComponent,
    ItemdetailComponent,
    MyitemspComponent,
  CartfComponent,
  ChartpubComponent,
 MaisonlistComponent,
    ContratLocationlistComponent,
    MaisonlistbackComponent,
    MaisondetailComponent,
    MaisondetailbackComponent,
    ContratLocationlistComponent,
    CovoiturageComponent,
    AddCovoiturageComponent,
    ListCovoiturageComponent,   
    AvisComponent,
    MapComponent,
    DetailCovoiturageComponent,
    MyCovoituragesComponent,
    ItemListComponent,
    ItemListUsersComponent,
    PubDiscussComponent,
    MyitemsComponent,
    
    LoginComponent,
    GUserComponent,
    SignuppComponent,
    ProfileComponent,
    ForgetpwdComponent,
    SessionAddComponent,
    GameListComponent,
    SessionListComponent,
    GameAddComponent,
    GameEditComponent,
    GameListBComponent,
    SessionListBComponent,
    UserSessionsComponent,
    StatsComponent,
    HomeComponent,
    HomebComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatPaginatorModule,
    NgbModule,
    MatSliderModule,
    BrowserAnimationsModule, // Add BrowserAnimationsModule to imports
    MatSnackBarModule,
    HttpClientModule,
    MatDialogModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,      
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule, 
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
