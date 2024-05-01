import { Component, OnInit } from '@angular/core';
import { AddCovoiturageComponent } from '../add-covoiturage/add-covoiturage.component';
import { Router } from '@angular/router';
import { Covoiturage } from 'src/app/Models/covoiturage';
import { CovoiturageService } from 'src/app/Services/covoiturage.service';
import { Avis } from 'src/app/Models/avis';
import { AvisService } from 'src/app/Services/avis.service';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from '../map/map.component'; 
import { MapService } from 'src/app/Services/map.service';
import * as L from 'leaflet';
@Component({
  selector: 'app-list-covoiturage',
  templateUrl: './list-covoiturage.component.html',
  styleUrls: ['./list-covoiturage.component.css']
})
export class ListCovoiturageComponent implements OnInit{
  constructor(private router:Router , private covoiturageService:CovoiturageService , private avisService:AvisService,public dialog: MatDialog,private MapService:MapService){ } 
  
  public covoiturages: Array<Covoiturage> =[];
  covoiturage: Covoiturage = new Covoiturage();
  avis : Avis = new Avis();
  map!: L.Map;
  showAddDialog: boolean = false;
  selectedCovoiturageId!: number;

  //public listavisCov: Array<Avis> =[];
  listavisCov: { [id_cov: string]: Avis[] } = {};

  ngOnInit(): void {
    this.getListCovoiturage();
    this.loadCovoiturages();
   
   
  }
  submitAvis() {
    if (!this.avis.description) {
      // Show error message if description is empty
      console.log("Description is required.");
      return;
    }
    // Add the avis for the selected covoiturage
    this.avisService.addAvis(this.avis, this.selectedCovoiturageId)
      .subscribe(
        (response) => {
          console.log("Avis added successfully:", response);
          // Refresh the list of avis
          this.getListAvis(this.selectedCovoiturageId);
          // Reset the form
          this.avis = new Avis();
        },
        (error) => {
          console.error("Error adding avis:", error);
          // Handle error
        }
      );
  }

    ajouterCovoiturage() {
      this.router.navigateByUrl('/addCovoiturage');
    
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
         this.getListAvis(type.id_cov);
         

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
    getListAvis(id_cov:any)
    { 
      this.avisService.getAvisByCov(id_cov)
      .subscribe(
        (avisList: Avis[]) => {
          this.listavisCov[id_cov] = avisList;
        },
        (error) => {
          console.error(error);
        }
      );
  }
  

  initMap(lieu_depart: string): void {
    this.map = L.map('map').setView([36.8065, 10.1815], 12);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  
  
  }
  addMarker(latitude: number, longitude: number): void {
    L.marker([latitude, longitude]).addTo(this.map);
  }

    openDialog(lieu_depart: string): void {
      this.showAddDialog = true;
      setTimeout(() => {
        this.initMap(lieu_depart);
      }, 100); // Delay to ensure that the dialog is fully rendered before initializing the map
    }
    

  
  getLocationCoordinates(lieu_depart:string): void {
    this.MapService.getCoordinates(lieu_depart)
      .then(coordinates => {
        console.log('Latitude:', coordinates.latitude);
        console.log('Longitude:',coordinates.longitude);
       this.addMarker(coordinates.latitude, coordinates.longitude);
  
        // Now you can use these coordinates as needed
      })
      
  }
 

}



