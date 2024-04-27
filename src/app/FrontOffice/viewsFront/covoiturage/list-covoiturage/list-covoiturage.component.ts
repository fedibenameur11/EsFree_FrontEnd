import { Component, OnInit } from '@angular/core';
import { AddCovoiturageComponent } from '../add-covoiturage/add-covoiturage.component';
import { Router } from '@angular/router';
import { Covoiturage } from 'src/app/Models/covoiturage';
import { CovoiturageService } from 'src/app/Services/covoiturage.service';
import { Avis } from 'src/app/Models/avis';
import { AvisService } from 'src/app/Services/avis.service';
@Component({
  selector: 'app-list-covoiturage',
  templateUrl: './list-covoiturage.component.html',
  styleUrls: ['./list-covoiturage.component.css']
})
export class ListCovoiturageComponent implements OnInit{
  constructor(private router:Router , private covoiturageService:CovoiturageService , private avisService:AvisService){ } 
  
  public covoiturages: Array<Covoiturage> =[];
  covoiturage: Covoiturage = new Covoiturage();
  avis : Avis = new Avis();
  //public listavisCov: Array<Avis> =[];
  listavisCov: { [id_cov: string]: Avis[] } = {};
  ngOnInit(): void {
    this.getListCovoiturage();
    this.loadCovoiturages();
   
    
  }
    ajouterCovoiturage() {
      this.router.navigate(['/addCovoiturage']);
    
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
         this.getListAvis(type.id_cov);
       })
     },
     (error) => 
       {
         console.error(error);
       }
     );
    }
    
     loadCovoiturages() {
      this.covoiturageService.getListCovoiturage().subscribe(
        data => {
          this.covoiturages = data;
        },
        error => {
          console.error('Error loading covoiturages:', error);
          // Handle the error appropriately, e.g., display an error message to the user
        }
      );
    }
    getListAvis(id_cov:any)
    { 
      this.avisService.getAvisByCov(id_cov)
      .subscribe(
        (avisList: Avis[]) => {
          this.listavisCov[id_cov] = avisList;
        },
        (error) => {
          console.error(error);
        }
      );
  }
    }



