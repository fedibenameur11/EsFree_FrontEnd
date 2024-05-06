import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Raba3 } from 'src/app/Models/raba3';
import { Raba3Service } from 'src/app/Services/raba3.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user-sessions',
  templateUrl: './user-sessions.component.html',
  styleUrls: ['./user-sessions.component.css']
})
export class UserSessionsComponent implements OnInit{
  idRaba3!: number
  name: String = "rechpa"
  game : Raba3[]=[]
  raba3: Raba3 = new Raba3();
  showUpdateDialog: boolean = false;
  newSession: Raba3 = new Raba3(); 



  openUpdateDialog() {
    this.showUpdateDialog = true;
  }
  closeUpdateDialog() {
    this.showUpdateDialog = false;
  }

  constructor(private act:ActivatedRoute,private raba3Service:Raba3Service, private router: Router,private dialog :MatDialog){ }
  public sessions: Array<Raba3> =[];

  ngOnInit(): void {
    this.act.paramMap.subscribe(params => {
      this.name = this.act.snapshot.params['name']
    });
    this.retrieveGameSession(this.name);

    this.act.paramMap.subscribe(params => {
      this.idRaba3 = this.act.snapshot.params['idRaba3']
    });
    this.onModalUpdateOpen(this.idRaba3);
    
  }
  retrieveGameSession(name:String)
  {
   this.raba3Service.retrieveUserGameSession(name).subscribe(
     (d) => {
      d.forEach((type:Raba3) =>
       {
         console.log(type.idRaba3);
         console.log(type.description);
         console.log(type.nombrePlaces);
         console.log(type.dateDebut);
         console.log(type.dateFin);
        
         this.sessions = d ;
       })
     },
     (error) => 
       {
         console.error(error);
       }
     );
    }


    onModalUpdateOpen(idRaba3: number): void {
      this.openUpdateDialog();
      this.raba3Service.retieveGameSessionSpecificUser(idRaba3,'rechpa').subscribe((sessions: Raba3) => {
        // Affecter les valeurs récupérées aux champs de formulaire
        this.newSession = sessions;
        
        
      });
    }

    onSubmitUpdate(): void {
    
      this.raba3Service.updateGameSession(this.newSession).subscribe(
        response => {
          console.log('Game session updated', this.newSession);
          this.closeUpdateDialog();
  
  
        },
        error => {
          console.error('Failed to update', error);
        }
      );
    }


    deleteGameSession(idRaba3: number): void {
      // Affichage de la boîte de dialogue de confirmation
      Swal.fire({
        title: 'Are you sure ?',
        text: 'You want to delete this game Session ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it.',
        cancelButtonText: 'No, cancel.'
      }).then((result) => {
        if (result.isConfirmed) {
          // Si l'utilisateur clique sur "Yes", supprimez l'événement
          this.raba3Service.deleteGameSession(idRaba3)
            .subscribe(
              () => {
                // Mettez à jour la liste des événements après la suppression
                this.sessions = this.sessions.filter(jeux => jeux.idRaba3 !== idRaba3);
                // Affichez une alerte de suppression réussie
                Swal.fire('Deleted!', 'Your game Session has been deleted.', 'success');
              },
              (error: any) => {
                console.error('Error deleting game:', error);
                // Affichez une alerte d'erreur en cas d'échec de suppression
                Swal.fire('Error!', 'Failed to delete the game Session', 'error');
              }
              
            );
  
        }
      });
    }
  
    getNumberArray(count: number): number[] {
      return Array.from({ length: count }, (_, i) => i + 1);
    }

}
