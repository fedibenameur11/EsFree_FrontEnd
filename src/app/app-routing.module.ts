import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplatesFrontComponent } from './FrontOffice/all-templates-front/all-templates-front.component';
import { AllTemplatesBackComponent } from './BackOffice/all-templates-back/all-templates-back.component';
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
