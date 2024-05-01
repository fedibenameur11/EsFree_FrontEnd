import { Component, OnInit } from '@angular/core';
import { Covoiturage } from 'src/app/Models/covoiturage';
import { AvisService } from 'src/app/Services/avis.service';
import { CovoiturageService } from 'src/app/Services/covoiturage.service';
import Swal from 'sweetalert2';
import { Avis } from 'src/app/Models/avis';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-covoiturage',
  templateUrl: './covoiturage.component.html',
  styleUrls: ['./covoiturage.component.css']
})
export class CovoiturageComponent implements OnInit {
  covoiturage: Covoiturage = new Covoiturage();
  avis : Avis = new Avis();
  showAddDialog: boolean = false;
  selectedCovoiturageId!: number;

  listavisCov: { [id_cov: string]: Avis[] } = {};
  constructor(private covoiturageService:CovoiturageService,public dialog: MatDialog,private avisService:AvisService){ }

  public covoiturages: Array<Covoiturage> =[];
  ngOnInit(): void {
    this.getListCovoiturage();
    this.loadCovoiturages();
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
  
  deleteCovoiturage(id_cov: number) {
    
    
        this.covoiturageService.deleteCovoiturage(id_cov).subscribe(
          response => {
            console.log('Covoiturage deleted successfully:', response);

          this.loadCovoiturages();
          },
          (error) => {
            console.error('Error deleting covoiturage:', error);
            // Handle error
          }
        );
      }

      openDialog(id_cov:number): void {
        this.showAddDialog = true;
        this.selectedCovoiturageId = id_cov;
        
      }
}
  

