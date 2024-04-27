import { Component,OnInit } from '@angular/core';
import { Avis } from 'src/app/Models/avis';
import { AvisService } from 'src/app/Services/avis.service';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit {
  avis: Avis = new Avis();
  public listavis: Array<Avis> =[];
  constructor(private AvisService:AvisService){}

  ngOnInit(): void {
      this.getListAvis();
  }
  getListAvis()
  {
   this.AvisService.getListAvis().subscribe(
     (d) => {
      d.forEach((type:Avis) =>
       {
         console.log(type.id_avis);
         console.log(type.description);
        
         this.listavis = d ;
       })
     },
     (error) => 
       {
         console.error(error);
       }
     );
    }
 
}
