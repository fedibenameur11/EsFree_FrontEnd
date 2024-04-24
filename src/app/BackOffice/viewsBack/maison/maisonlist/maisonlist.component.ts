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
  constructor(private maisonService: MaisonService, private router: Router,private dialog :MatDialog) {}
  ngOnInit(){
    this.loadUsers();

  }
  loadUsers(){
    this.maisonService.findAllMaisons().subscribe(
      maison => {
        this.maison =maison
        console.error('Done:', );
        
      },
      error => {
        console.error('Error loading homes:', error);
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
}
