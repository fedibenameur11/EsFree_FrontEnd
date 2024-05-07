import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplatesFrontComponent } from './FrontOffice/all-templates-front/all-templates-front.component';
import { AllTemplatesBackComponent } from './BackOffice/all-templates-back/all-templates-back.component';
import { CollocationListComponent } from './FrontOffice/viewsFront/colocation/collocation-list/collocation-list.component';
import { CollocationAddComponent } from './FrontOffice/viewsFront/colocation/collocation-add/collocation-add.component';
import { ItemListComponent } from './BackOffice/viewsBack/lostandfound/item-list/item-list.component';
import { ItemListUsersComponent } from './FrontOffice/viewsFront/lostandfound/item-list-users/item-list-users.component';
import { PubDiscussComponent } from './FrontOffice/viewsFront/lostandfound/pub-discuss/pub-discuss.component';
import { MyitemsComponent } from './FrontOffice/viewsFront/lostandfound/myitems/myitems.component';


const routes: Routes = [
   {
    path:"",
    component : AllTemplatesFrontComponent,
    children:[

      {path:"collocationList", component:CollocationListComponent},
      {path:"collocationadd", component:CollocationAddComponent},
      {path:"itemList", component:ItemListUsersComponent},
      {path:"itemList/PubDiscuss/:id", component:PubDiscussComponent},
      {path:"myitems/:id", component:MyitemsComponent}

      // hné l components mta3 l frontOffice lkol
   ]
   },
 
  
   {
    path:"admin",
    component : AllTemplatesBackComponent,
    children:[

      // hné l components mta3 l backOffice lkol 
      {path:"itemList", component:ItemListComponent}

   
   ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
