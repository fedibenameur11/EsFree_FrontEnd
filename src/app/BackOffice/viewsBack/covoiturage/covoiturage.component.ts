import { Component, OnInit } from '@angular/core';
import { Covoiturage } from 'src/app/Models/covoiturage';
import { CovoiturageService } from 'src/app/Services/covoiturage.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-covoiturage',
  templateUrl: './covoiturage.component.html',
  styleUrls: ['./covoiturage.component.css']
})
export class CovoiturageComponent implements OnInit {
  covoiturage: Covoiturage = new Covoiturage();
  constructor(private covoiturageService:CovoiturageService){ }
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
  
  deleteCovoiturage(id_cov: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this covoiturage!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      customClass: {
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button'
      }
    
    }).then((result) => {
      if (result.isConfirmed) {
        this.covoiturageService.deleteCovoiturage(id_cov).subscribe(
          data => {
            Swal.fire(
              'Deleted!',
              'Your covoiturage has been deleted.',
              'success'
            );
            this.loadCovoiturages();
          },
          error => {
            console.error('Error deleting covoiturage:', error);
            Swal.fire(
              'Error!',
              'Failed to delete covoiturage.',
              'error'
            );
            // Handle the error appropriately, e.g., display an error message to the user
          }
        );
      }
    });
  }
}
