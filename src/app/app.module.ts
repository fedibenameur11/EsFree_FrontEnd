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

import { EventListComponent } from './BackOffice/viewsBack/event/event-list/event-list.component';
import { EventListFrontComponent } from './FrontOffice/viewsFront/event/event-list-front/event-list-front.component';
import { HttpClientModule } from '@angular/common/http';
import { EventAddFrontComponent } from './FrontOffice/viewsFront/event/event-add-front/event-add-front.component';
import { EventDetailFrontComponent } from './FrontOffice/viewsFront/event/event-detail-front/event-detail-front.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EventCalendarComponent } from './FrontOffice/viewsFront/event/event-calendar/event-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ParticipationListFrontComponent } from './FrontOffice/viewsFront/event/participation-list-front/participation-list-front.component';
import { ParticipationListComponent } from './BackOffice/viewsBack/event/participation-list/participation-list.component';
import { EventListUserComponent } from './FrontOffice/viewsFront/event/event-list-user/event-list-user.component';
import { StatEventComponent } from './BackOffice/viewsBack/event/stat-event/stat-event.component';
import { environment } from './environnement/environnement';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";

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
    StatEventComponent
    
    
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
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
