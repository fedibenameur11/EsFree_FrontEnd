import { Component } from '@angular/core';
import { AddCovoiturageComponent } from '../add-covoiturage/add-covoiturage.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-covoiturage',
  templateUrl: './list-covoiturage.component.html',
  styleUrls: ['./list-covoiturage.component.css']
})
export class ListCovoiturageComponent {
  constructor(private router:Router){} 
  

    ajouterCovoiturage() {
      this.router.navigate(['/addCovoiturage']);
    
    }
}
