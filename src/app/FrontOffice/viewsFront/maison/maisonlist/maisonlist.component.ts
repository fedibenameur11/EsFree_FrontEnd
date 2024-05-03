import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Maison } from 'src/app/Models/maison';
import { MaisonService } from 'src/app/Services/maison.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/Models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maisonlist',
  templateUrl: './maisonlist.component.html',
  styleUrls: ['./maisonlist.component.css']
})
export class MaisonlistComponent {
  maison : Maison[]=[]
  affiche_add: boolean = false;
  affiche_modif : boolean = false;
  newMaison: Maison = new Maison(); 
  showAddDialog: boolean = false;
  showUpdateDialog: boolean = false;
  demandeur!:User;
  maisonsDisponibles: Maison[]=[];


  openAddDialog() {
    this.showAddDialog = true;
  }
  openUpdateDialog() {
    this.showUpdateDialog = true;
  }
  closeAddDialog() {
    this.showAddDialog = false;
  }
  closeUpdateDialog() {
    this.showUpdateDialog = false;
  }

  constructor(private maisonService: MaisonService, private router: Router,private dialog :MatDialog) {
    this.newMaison.user = {
      userName: 'fedi',
      userFirstName: 'fedi',
      userLastName: 'fedi',
      userPassword: 'fedi',
      roles :[]
    };
    this.demandeur ={
      userName: 'fedi4',
      userFirstName: 'fedi',
      userLastName: 'fedi',
      userPassword: 'fedi',
      roles :[]

    }
  }
  ngOnInit(){
    this.listMaisons();
    
  }
  /*listMaisons(){
    this.maisonService.findAllMaisons().subscribe(
      maison => {
        this.maison =maison
        console.error('Done:', );
        
      },
      error => {
        console.error('Error loading houses:', error);
      }
    );
  }*/
  
  listMaisons() {
  this.maisonService.findAllMaisons().subscribe(
    maisons => {
      // Filtrer les maisons avec un nombre de places disponibles > 0
      this.maisonsDisponibles = maisons.filter(maison => maison.nbrplacedispo > 0);
      console.error('Done:', this.maisonsDisponibles);
    },
    error => {
      console.error('Error loading houses:', error);
    }
  );
}
  onSubmit(): void {
    console.log('Nouvelle maison a été ajouté', this.newMaison);

    this.maisonService.addMaisonByUser(this.newMaison,this.newMaison.user.userName).subscribe(() => {
      console.log('Nouvelle maison a été ajouté', this.newMaison);
      this.showAddDialog = false;
      window.location.reload();
      
    });
  }

  onClose(): void {
    //this.dialogRef.close(); 
  }

  onModalUpdateOpen(maisonId: number): void {
    this.openUpdateDialog();
    this.maisonService.getMaisonById(maisonId).subscribe((maison: Maison) => {
      // Affecter les valeurs récupérées aux champs de formulaire
      this.newMaison = maison;
      
      
    });
  }
  onSubmitUpdate(): void {
    

    this.maisonService.updateMaison(this.newMaison).subscribe(() => {
      console.log('Nouvelle maison a été ajouté', this.newMaison);
      this.closeUpdateDialog();
      //this.dialogRef.close(true); 
    });
    console.log('La maison a été modifié', this.newMaison);
    window.location.reload();
  }

  deleteMaison(idMaison: number): void {
    this.maisonService.deleteMaison(idMaison).subscribe(() => {
      console.log("Maison supprimé avec succés");
    }, (error) => {
      console.log("Echec dasn la suppression de cette maison ");
    });
    window.location.reload();
  }

  reserverMaison(maisonId: number, demandeur: User): void {
    this.maisonService.ajouterDemandeur(maisonId, demandeur)
      .subscribe(() => {
        // Affichez une alerte de succès pour la demande envoyée
        Swal.fire('Success!', 'Demande envoyée avec succès', 'success');
        console.log('Demandeur ajouté avec succès');
      }, (error) => {
        console.error('Erreur dans l\'Envoie de cette demande. : ', error);
        // Affichez une alerte d'erreur en cas d'échec de l'ajout du demandeur
        Swal.fire('Error!', 'Erreur dans l\'Envoie de cette demande.', 'error');
      });
      
  }
  
  
}
