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
  showAddContratDialog: boolean = false;
  
  openAddDialog() {
    this.showAddDialog = true;
  }
  openAddContratDialog() {
    this.showAddContratDialog = true;
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
      }
    );
  }
  onSubmit(): void {
    this.maisonService.addMaisonByUser(this.newMaison,this.newMaison.user.userName).subscribe(() => {
      console.log('Nouvelle maison a été ajouté', this.newMaison);
      this.showAddDialog = false;
      
    });
    window.location.reload();
  }

  onModalUpdateOpen(maisonId: number): void {
    this.openUpdateDialog();
    this.maisonService.getMaisonById(maisonId).subscribe((maison: Maison) => {
      this.newMaison = maison;   
      
    });
  }
  onSubmitUpdate(): void {
    
    this.maisonService.updateMaison(this.newMaison).subscribe(() => {
      console.log('Nouvelle maison a été ajouté', this.newMaison);
      this.closeUpdateDialog();
    });
    console.log('La maison a été modifié', this.newMaison);
    window.location.reload();
  }

  deleteMaison(idMaison: number): void {
    this.maisonService.deleteMaison(idMaison).subscribe(() => {
      console.log("Maison supprimé avec succés");
    }, (error) => {
      console.log("Echec dans la suppression de cette maison ");
    });
    window.location.reload();
  }
  
  
}
