import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Maison } from 'src/app/Models/maison';
import { MaisonService } from 'src/app/Services/maison.service';
import { AddMaisonComponent } from '../add-maison/add-maison.component';
import { MatDialog } from '@angular/material/dialog';

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
  
  openAddDialog() {
    this.showAddDialog = true;
  }

  closeAddDialog() {
    this.showAddDialog = false;
  }
  constructor(private maisonservice: MaisonService, private router: Router,private dialog :MatDialog) {}
  ngOnInit(){
    this.listMaisons();

  }
  listMaisons(){
    this.maisonservice.findAllMaisons().subscribe(
      maison => {
        this.maison =maison
        console.error('Done:', );
        
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }
  createNewTask(): void {
    const dialogRef = this.dialog.open(AddMaisonComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container' 
    });
  
    dialogRef.afterClosed().subscribe(result   => {
      if (result) {
      }
    });
  }
  onSubmit(): void {
    console.log('Nouvelle maison a été ajouté', this.newMaison);

    this.maisonservice.addMaison(this.newMaison).subscribe(() => {
      console.log('Nouvelle maison a été ajouté', this.newMaison);
      this.showAddDialog = false;
      //this.dialogRef.close(true); 
    });
  }

  onClose(): void {
    //this.dialogRef.close(); 
  }

}
