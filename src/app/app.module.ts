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
import { ItemListComponent } from './BackOffice/viewsBack/lostandfound/item-list/item-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemListUsersComponent } from './FrontOffice/viewsFront/lostandfound/item-list-users/item-list-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PubDiscussComponent } from './FrontOffice/viewsFront/lostandfound/pub-discuss/pub-discuss.component';
import { MyitemsComponent } from './FrontOffice/viewsFront/lostandfound/myitems/myitems.component';


@NgModule({
  declarations: [
    AppComponent,
    AllTemplatesBackComponent,
    AllTemplatesFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    ItemListComponent,
    ItemListUsersComponent,
    PubDiscussComponent,
    MyitemsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
