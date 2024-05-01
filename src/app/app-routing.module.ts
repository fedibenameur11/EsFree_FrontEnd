import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplatesFrontComponent } from './FrontOffice/all-templates-front/all-templates-front.component';
import { AllTemplatesBackComponent } from './BackOffice/all-templates-back/all-templates-back.component';
import { CollocationListComponent } from './FrontOffice/viewsFront/colocation/collocation-list/collocation-list.component';
import { CollocationAddComponent } from './FrontOffice/viewsFront/colocation/collocation-add/collocation-add.component';
import { PubitemComponent } from './BackOffice/viewsBack/marketplace/pubitem/pubitem.component';
import { CartComponent } from './BackOffice/viewsBack/marketplace/cart/cart.component';
import { MarketComponent } from './FrontOffice/viewsFront/marketplace/market/market.component';
import { ItemdetailComponent } from './FrontOffice/viewsFront/marketplace/itemdetail/itemdetail.component';



const routes: Routes = [
   {
    path:"",
    component : AllTemplatesFrontComponent,
    children:[

      {path:"collocationList", component:CollocationListComponent},
      {path:"collocationadd", component:CollocationAddComponent},
      {path:"market", component:MarketComponent},
      {path:"itemdetail", component:ItemdetailComponent}


      // hné l components mta3 l frontOffice lkol
   
   ]
   },
 
  
   {
    path:"admin",
    component : AllTemplatesBackComponent,
    children:[
      {path:"Pubitem",component:PubitemComponent},
      {path:"Cart",component:CartComponent},


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
