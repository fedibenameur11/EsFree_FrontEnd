import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplatesFrontComponent } from './FrontOffice/all-templates-front/all-templates-front.component';
import { AllTemplatesBackComponent } from './BackOffice/all-templates-back/all-templates-back.component';
import { CollocationListComponent } from './FrontOffice/viewsFront/colocation/collocation-list/collocation-list.component';
import { CollocationAddComponent } from './FrontOffice/viewsFront/colocation/collocation-add/collocation-add.component';
import { LoginComponent } from './Login/login/login.component';

import { GUserComponent } from './BackOffice/viewsBack/user/g-user/g-user.component';
import { SignuppComponent } from './Login/signupp/signupp.component';
import { ProfileComponent } from './Login/profile/profile.component';
import { authGuard } from './Service/auth.guard';

const routes: Routes = [
  {path:"login",
  component:LoginComponent
  },
  {path:"signup",
  component:SignuppComponent
  },

   {      
     
    path:"user",
    component : AllTemplatesFrontComponent, canActivate:[authGuard],
    children:[

      {path:"collocationList", component:CollocationListComponent,canActivate:[authGuard]},
      {path:"collocationadd", component:CollocationAddComponent, canActivate:[authGuard]}, 
      {path:"profile",  component:ProfileComponent ,  canActivate:[authGuard]}

      // hné l components mta3 l frontOffice lkol
   
   ]
   },
 
  
   {
    path:"admin" ,
    component : AllTemplatesBackComponent ,canActivate:[authGuard],
    children:[  

      {path:"users", component:GUserComponent,  canActivate:[authGuard]},
      {path:"profile",
      component:ProfileComponent,  canActivate:[authGuard]
      },


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
