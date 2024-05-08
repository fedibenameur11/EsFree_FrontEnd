import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplatesFrontComponent } from './FrontOffice/all-templates-front/all-templates-front.component';
import { AllTemplatesBackComponent } from './BackOffice/all-templates-back/all-templates-back.component';
import { CollocationListComponent } from './FrontOffice/viewsFront/colocation/collocation-list/collocation-list.component';
import { CollocationAddComponent } from './FrontOffice/viewsFront/colocation/collocation-add/collocation-add.component';
import { GameListComponent } from './FrontOffice/viewsFront/raba3/game-list/game-list.component';
import { SessionAddComponent } from './FrontOffice/viewsFront/raba3/session-add/session-add.component';
import { SessionListComponent } from './FrontOffice/viewsFront/raba3/session-list/session-list.component';


import { GameEditComponent } from './BackOffice/viewsBack/raba3/game-edit/game-edit.component';
import { GameAddComponent } from './BackOffice/viewsBack/raba3/game-add/game-add.component';
import { GameListBComponent } from './BackOffice/viewsBack/raba3/game-list-b/game-list-b.component';
import { SessionListBComponent } from './BackOffice/viewsBack/raba3/session-list-b/session-list-b.component';
import { UserSessionsComponent } from './FrontOffice/viewsFront/raba3/user-sessions/user-sessions.component';
import { StatsComponent } from './FrontOffice/viewsFront/raba3/stats/stats.component';



const routes: Routes = [
   {
    path:"",
    component : AllTemplatesFrontComponent,
    children:[

      {path:"collocationList", component:CollocationListComponent},
      {path:"collocationadd", component:CollocationAddComponent},
      {path:"raba3", component:GameListComponent},
      {path:"sessionList/:idJeux", component:SessionListComponent},
      {path:"userSessions/:name", component:UserSessionsComponent},
      {path:"stats", component:StatsComponent},



      // hné l components mta3 l frontOffice lkol
   
   ]
   },
 
  
   {
    path:"admin",
    component : AllTemplatesBackComponent,
    children:[
      {path:"gameAdd", component:GameAddComponent},
      {path:"gameListB", component:GameListBComponent},
      {path:"gameEdit", component:GameEditComponent},
      {path:"sessionListB", component:SessionListBComponent},

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
