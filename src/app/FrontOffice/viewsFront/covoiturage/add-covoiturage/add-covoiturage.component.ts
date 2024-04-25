import { Component } from '@angular/core';
import { Covoiturage } from 'src/app/Models/covoiturage';
import { CovoiturageService } from 'src/app/Services/covoiturage.service';
//import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-covoiturage',
  templateUrl: './add-covoiturage.component.html',
  styleUrls: ['./add-covoiturage.component.css']
})
export class AddCovoiturageComponent {
  covoiturage: Covoiturage = new Covoiturage();
 

  constructor(private covoiturageService: CovoiturageService) { }

  onSubmit() {
    this.covoiturageService.addCovoiturage(this.covoiturage).subscribe(
      data => {
        console.log('Covoiturage added successfully!', data);
      },
      error => {
        console.error('Error adding covoiturage:', error);
        
      }
    );
  }

  
}
