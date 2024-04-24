import { Component, OnInit } from '@angular/core';
import { Covoiturage } from 'src/app/Models/covoiturage';
import { CovoiturageService } from 'src/app/Services/covoiturage.service';
@Component({
  selector: 'app-covoiturage',
  templateUrl: './covoiturage.component.html',
  styleUrls: ['./covoiturage.component.css']
})
export class CovoiturageComponent implements OnInit {
  constructor(private covoiturageService:CovoiturageService){ }
  public covoiturages: Array<Covoiturage> =[];
  ngOnInit(): void {
    this.getListCovoiturage();
  }
  getListCovoiturage()
  {
   this.covoiturageService.getListCovoiturage().subscribe(
     (d) => {
      d.forEach((type:Covoiturage) =>
       {
         console.log(type.id_cov);
         console.log(type.nombre_placecov);
         console.log(type.lieu_depart);
         console.log(type.destination);
         console.log(type.date_depart);
         console.log(type.description);
         this.covoiturages = d ;
       })
     },
     (error) => 
       {
         console.error(error);
       }
     );
   
  }
}
