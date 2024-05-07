import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplatesFrontComponent } from './FrontOffice/all-templates-front/all-templates-front.component';
import { AllTemplatesBackComponent } from './BackOffice/all-templates-back/all-templates-back.component';
import { CollocationListComponent } from './FrontOffice/viewsFront/colocation/collocation-list/collocation-list.component';
import { CollocationAddComponent } from './FrontOffice/viewsFront/colocation/collocation-add/collocation-add.component';
import { EventListComponent } from './BackOffice/viewsBack/event/event-list/event-list.component';
import { EventListFrontComponent } from './FrontOffice/viewsFront/event/event-list-front/event-list-front.component';
import { EventAddFrontComponent } from './FrontOffice/viewsFront/event/event-add-front/event-add-front.component';
import { EventDetailFrontComponent } from './FrontOffice/viewsFront/event/event-detail-front/event-detail-front.component';
import { EventCalendarComponent } from './FrontOffice/viewsFront/event/event-calendar/event-calendar.component';
import { ParticipationListComponent } from './BackOffice/viewsBack/event/participation-list/participation-list.component';
import { EventListUserComponent } from './FrontOffice/viewsFront/event/event-list-user/event-list-user.component';
import { ParticipationListFrontComponent } from './FrontOffice/viewsFront/event/participation-list-front/participation-list-front.component';
import { StatEventComponent } from './BackOffice/viewsBack/event/stat-event/stat-event.component';
import { PubitemComponent } from './BackOffice/viewsBack/marketplace/pubitem/pubitem.component';
import { CartComponent } from './BackOffice/viewsBack/marketplace/cart/cart.component';
import { MarketComponent } from './FrontOffice/viewsFront/marketplace/market/market.component';
import { ItemdetailComponent } from './FrontOffice/viewsFront/marketplace/itemdetail/itemdetail.component';
import { MyitemsComponent } from './FrontOffice/viewsFront/marketplace/myitems/myitems.component';
import { CartfComponent } from './FrontOffice/viewsFront/marketplace/cartf/cartf.component';
import { ChartpubComponent } from './BackOffice/viewsBack/marketplace/chartpub/chartpub.component';
import { ContratLocationlistComponent } from './BackOffice/viewsBack/contratLocation/contrat-locationlist/contrat-locationlist.component';
import { MaisonlistComponent } from './FrontOffice/viewsFront/maison/maisonlist/maisonlist.component';
import { MaisonlistbackComponent } from './BackOffice/viewsBack/maison/maisonlist/maisonlist.component';
import { MaisondetailComponent } from './FrontOffice/viewsFront/maison/maisondetail/maisondetail.component';
import { MaisondetailbackComponent } from './BackOffice/viewsBack/maison/maisondetailback/maisondetailback.component';

//import { ContratLocationAddComponent } from './FrontOffice/viewsFront/colocation/contratLocation/contrat-location-add/contrat-location-add.component';
//import { CollocationListComponent } from './FrontOffice/viewsFront/colocation/collocation-list/collocation-list.component';



const routes: Routes = [
   {
    path:"",
    component : AllTemplatesFrontComponent,
    children:[

      {path:"collocationList", component:CollocationListComponent},
      {path:"collocationadd", component:CollocationAddComponent},
      {path:"eventlist", component:EventListFrontComponent},
      { path: "addevent", component: EventAddFrontComponent },
      { path: "eventdetail/:idEvent", component: EventDetailFrontComponent },
      { path: "eventcalendar", component: EventCalendarComponent },
      { path: "listparticipationuser", component: ParticipationListComponent },
      { path: "myevents", component: EventListUserComponent },
      { path: "myparticipations", component: ParticipationListFrontComponent },

      // hné l components mta3 l frontOffice lkol
      {path:"market", component:MarketComponent},
      {path:"itemdetail/:id_pub", component:ItemdetailComponent},
      {path:"myitems", component:MyitemsComponent},
      {path:"cartf", component: CartfComponent},
      //{path:"collocationList", component:CollocationListComponent},
      {path:"maisonlist", component:MaisonlistComponent},
      {path:"contratlocationlist", component:ContratLocationlistComponent},
      { path: 'afficherMaison/:id', component: MaisondetailComponent }
     
      // hné l components mta3 l frontOffice lkol
   
   ]
   },
 
  
   {
    path:"admin",
    component : AllTemplatesBackComponent,
    children:[

      // hné l components mta3 l backOffice lkol 
     { path:"eventlist", component:EventListComponent},
     { path: "participationlist", component: ParticipationListComponent },
     { path: "statevents", component: StatEventComponent },
      {path:"Pubitem",component:PubitemComponent},
      {path:"Cart",component:CartComponent},
      {path:"chart",component:ChartpubComponent},

      {path:"maisonlist", component:MaisonlistbackComponent},
      { path: 'afficherMaison/:id', component: MaisondetailbackComponent },
      {path:"contrats", component:ContratLocationlistComponent}
      
    

      // hné l components mta3 l backOffice lkol 

   
   ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

 
}
