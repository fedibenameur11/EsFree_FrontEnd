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

import { EventAddFrontComponent } from './FrontOffice/viewsFront/event/event-add-front/event-add-front.component';
import { EventDetailFrontComponent } from './FrontOffice/viewsFront/event/event-detail-front/event-detail-front.component';
import { ReactiveFormsModule  } from '@angular/forms';

import { EventCalendarComponent } from './FrontOffice/viewsFront/event/event-calendar/event-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ParticipationListFrontComponent } from './FrontOffice/viewsFront/event/participation-list-front/participation-list-front.component';
import { ParticipationListComponent } from './BackOffice/viewsBack/event/participation-list/participation-list.component';
import { EventListUserComponent } from './FrontOffice/viewsFront/event/event-list-user/event-list-user.component';
import { StatEventComponent } from './BackOffice/viewsBack/event/stat-event/stat-event.component';
import { environment } from './environnement/environnement';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { PubitemComponent } from './BackOffice/viewsBack/marketplace/pubitem/pubitem.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CartComponent } from './BackOffice/viewsBack/marketplace/cart/cart.component';
import { MarketComponent } from './FrontOffice/viewsFront/marketplace/market/market.component';
import { ItemdetailComponent } from './FrontOffice/viewsFront/marketplace/itemdetail/itemdetail.component';
import { MyitemsComponent } from './FrontOffice/viewsFront/marketplace/myitems/myitems.component';
import { MatSliderModule } from '@angular/material/slider';
import { CartfComponent } from './FrontOffice/viewsFront/marketplace/cartf/cartf.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ChartpubComponent } from './BackOffice/viewsBack/marketplace/chartpub/chartpub.component';





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
    MyitemsComponent,
  CartfComponent,
  ChartpubComponent

    
    
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
 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
