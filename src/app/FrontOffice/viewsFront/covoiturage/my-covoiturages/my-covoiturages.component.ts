import { Component, OnInit } from '@angular/core';
import { CovoiturageService } from 'src/app/Services/covoiturage.service';
import { Covoiturage } from 'src/app/Models/covoiturage';
import { AvisService } from 'src/app/Services/avis.service';
import { Avis } from 'src/app/Models/avis';
declare var $: any;
@Component({
  selector: 'app-my-covoiturages',
  templateUrl: './my-covoiturages.component.html',
  styleUrls: ['./my-covoiturages.component.css']
})
export class MyCovoituragesComponent implements OnInit{
  public covoiturages: Array<Covoiturage> =[];
  ListCov: Covoiturage[] = [];
  covoiturage: Covoiturage = new Covoiturage();
  public avisList: Array<Avis>=[];
  selectedCovId!: number;
  selectedCov: Covoiturage | undefined;
constructor(private covoiturageService:CovoiturageService , private avisService: AvisService){}
ngOnInit(): void {
    this.retrieveCovoituragesByUser(3)
    this.retrieveAllAvisByUser(3)
}

openEditCovModal(idCov: number): void {
  this.selectedCovId = idCov;
  this.selectedCov = this.ListCov.find(cov => cov.id_cov === idCov);
  $('#editCovModal').modal('show');
}
editCov() {
  if (this.selectedCovId && this.selectedCov) { // Vérifiez si selectedCovId et selectedCov sont définis
    this.covoiturageService.updateCov(this.selectedCovId, this.selectedCov)
      .subscribe(
        (updatedCov: Covoiturage) => {
          $('#editCovModal').modal('hide');
        },
        (error: any) => console.error(error)
      );
  } else {
    console.error('Selected ID or covoiturage not found');
  }
}



  retrieveCovoituragesByUser(userId: number): void {
    this.covoiturageService.retrieveAllCovByUser(userId).subscribe(
      (d) => {
        d.forEach((type:Covoiturage) =>
         {
           console.log(type.id_cov);
           console.log(type.nombre_placecov);
           console.log(type.lieu_depart);
           console.log(type.destination);
           console.log(type.date_depart);
           console.log(type.description);
           this.ListCov = d ;
           
           
  
         })
       },
       (error) => 
         {
           console.error(error);
         }
       );
  }

  deleteCovoiturage(id_cov: number) {
    
    
    this.covoiturageService.deleteCovoiturage(id_cov).subscribe(
      response => {
        console.log('Covoiturage deleted successfully:', response);

     
      },
      (error) => {
        console.error('Error deleting covoiturage:', error);
        // Handle error
      }
    );
  }
  retrieveAllAvisByUser(id:number) {
    this.avisService.retrieveAllAvisByUser(id)
      .subscribe(avisList => {
        this.avisList = avisList;
      });
  }
  
deleteavis(id_avis:number)
{
  this.avisService.deleteAvis(id_avis).subscribe(
    response => {
      console.log('avis deleted successfully:', response);

   
    },
    (error) => {
      console.error('Error deleting avis:', error);
      // Handle error
    }
  );
}  
}
