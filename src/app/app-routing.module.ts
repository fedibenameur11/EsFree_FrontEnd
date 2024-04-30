import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplatesFrontComponent } from './FrontOffice/all-templates-front/all-templates-front.component';
import { AllTemplatesBackComponent } from './BackOffice/all-templates-back/all-templates-back.component';
import { EventListComponent } from './BackOffice/viewsBack/event/event-list/event-list.component';
import { EventListFrontComponent } from './FrontOffice/viewsFront/event/event-list-front/event-list-front.component';
import { EventAddFrontComponent } from './FrontOffice/viewsFront/event/event-add-front/event-add-front.component';
import { EventDetailFrontComponent } from './FrontOffice/viewsFront/event/event-detail-front/event-detail-front.component';
import { EventCalendarComponent } from './FrontOffice/viewsFront/event/event-calendar/event-calendar.component';
import { ParticipationListComponent } from './BackOffice/viewsBack/event/participation-list/participation-list.component';
import { EventListUserComponent } from './FrontOffice/viewsFront/event/event-list-user/event-list-user.component';
import { ParticipationListFrontComponent } from './FrontOffice/viewsFront/event/participation-list-front/participation-list-front.component';


const routes: Routes = [
   {
    path:"",
    component : AllTemplatesFrontComponent,
    children:[
      {path:"eventlist", component:EventListFrontComponent},
      { path: "addevent", component: EventAddFrontComponent },
      { path: "eventdetail/:idEvent", component: EventDetailFrontComponent },
      { path: "eventcalendar", component: EventCalendarComponent },
      { path: "listparticipationuser", component: ParticipationListComponent },
      { path: "myevents", component: EventListUserComponent },
      { path: "myparticipations", component: ParticipationListFrontComponent }

      // hné l components mta3 l frontOffice lkol
   
   ]
   },
 
  
   {
    path:"admin",
    component : AllTemplatesBackComponent,
    children:[

      // hné l components mta3 l backOffice lkol 
     { path:"eventlist", component:EventListComponent},
     { path: "participationlist", component: ParticipationListComponent }

   
   ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
