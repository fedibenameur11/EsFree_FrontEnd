import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Maison } from 'src/app/Models/maison';
import { MaisonService } from 'src/app/Services/maison.service';

@Component({
  selector: 'app-add-maison',
  templateUrl: './add-maison.component.html',
  styleUrls: ['./add-maison.component.css']
})
export class AddMaisonComponent implements OnInit {
  maison!: Maison;  
  


  newMaison: Maison = new Maison(); 
 


  constructor(private maisonservice: MaisonService, private dialogRef: MatDialogRef<AddMaisonComponent>) { }

  ngOnInit(): void {
   
    
  }
  


  
 
  onSubmit(): void {
    console.log('Nouvelle maison a été ajouté', this.newMaison);

    this.maisonservice.addMaison(this.newMaison).subscribe(() => {
      console.log('Nouvelle maison a été ajouté', this.newMaison);
      this.dialogRef.close(true); 
    });
  }

  onClose(): void {
    this.dialogRef.close(); 
  }

  

  

}

