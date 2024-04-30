import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Maison } from 'src/app/Models/maison';
import { MaisonService } from 'src/app/Services/maison.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-maisonlist',
  templateUrl: './maisonlist.component.html',
  styleUrls: ['./maisonlist.component.css']
})
export class MaisonlistbackComponent {
  maison : Maison[]=[]
  affiche_add: boolean = false;
  affiche_modif : boolean = false;
  newMaison: Maison = new Maison(); 
  showAddDialog: boolean = false;
  showUpdateDialog: boolean = false;
  
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
  }
  ngOnInit() {
    this.getMaisonsByUtilisateur('fedi');
  }
  getMaisonsByUtilisateur(userName: string) {
    this.maisonService.getMaisonsByUtilisateur(userName)
      .subscribe(maison => this.maison = maison);
  }
  
  listMaisons(){
    this.maisonService.findAllMaisons().subscribe(
      maison => {
        this.maison =maison
        console.error('Done:', );
        
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
  }

  deleteMaison(idMaison: number): void {
    this.maisonService.deleteMaison(idMaison).subscribe(() => {
      console.log("Maison supprimé avec succés");
    }, (error) => {
      console.log("Echec dasn la suppression de cette maison ");
    });
  }
  
  
}
