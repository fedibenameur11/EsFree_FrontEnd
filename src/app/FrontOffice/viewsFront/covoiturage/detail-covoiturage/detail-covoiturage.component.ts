import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Covoiturage } from 'src/app/Models/covoiturage';
import { CovoiturageService } from 'src/app/Services/covoiturage.service';
import { MapService } from 'src/app/Services/map.service';
import * as L from 'leaflet';
import { Avis } from 'src/app/Models/avis';
import { AvisService } from 'src/app/Services/avis.service';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-detail-covoiturage',
  templateUrl: './detail-covoiturage.component.html',
  styleUrls: ['./detail-covoiturage.component.css']
})
export class DetailCovoiturageComponent implements OnInit {
  id_cov!: number;
  map!: L.Map;
  avis : Avis = new Avis();
  listavisCov: { [id_cov: string]: Avis[] } = {};
  departureLatitude!: number
  departureLongitude!:number
  destinationLatitude!:number
  destinationLongitude!:number
   departureCoords = [this.departureLatitude, this.departureLongitude];
 destinationCoords= [this.destinationLatitude, this.destinationLongitude];

  
  covoiturage: Covoiturage = new Covoiturage();
  constructor(private covService:CovoiturageService,private route:ActivatedRoute,private MapService:MapService,private avisService:AvisService){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_cov = +params['id_cov']; // Récupère l'ID de l'événement depuis l'URL
      this.getCovDetails(this.id_cov);
      this.getListAvis(this.id_cov);
    });
   
  }

addAvis(id_cov:number)
{
  this.avisService.addAvis(this.avis,id_cov).subscribe(
    data => {
      console.log('notice added successfully!', data);
    },
    error => {
      console.error('Error adding notice:', error);
      
    }
  );
}
  getCovDetails(id_cov: number): void {
    this.covService.retrieveCov(id_cov).subscribe((data: Covoiturage) => {
      this.covoiturage = data;
      console.log(this.covoiturage.description)
      this.getDepartureCoordinates(this.covoiturage.lieu_depart);
      this.getDestinationCoordinates(this.covoiturage.destination);
      this.initMap(this.covoiturage.lieu_depart,this.covoiturage.destination) 
     
    });
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

//Mappppp

  initMap(lieu_depart: string,destination:string): void {
    this.map = L.map('map').setView([34.0, 9.0], 7);

  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    this.getDepartureCoordinates(lieu_depart);  
    this.getDestinationCoordinates(destination);
    setTimeout(() => {
    }, 100); 
  
  }
  addMarker(latitude: number, longitude: number): void {
    const marker = L.marker([latitude, longitude]).addTo(this.map);
    marker.bindPopup("Here is your departure location");
  }

   
  getDepartureCoordinates(lieu_depart:string): void {
    this.MapService.getCoordinates(lieu_depart)
      .then(coordinates => {
        console.log('Latitude:', coordinates.latitude);
        console.log('Longitude:',coordinates.longitude);
       this.addMarker(coordinates.latitude, coordinates.longitude);
       this.departureCoords[coordinates.latitude,coordinates.longitude];
     
      })
      
  }
  getDestinationCoordinates(destination:string): void {
    this.MapService.getCoordinates(destination)
      .then(coordinates => {
        console.log('Latitude:', coordinates.latitude);
        console.log('Longitude:',coordinates.longitude);
       this.addMarker(coordinates.latitude, coordinates.longitude);
       const destinationCoords = [coordinates.latitude, coordinates.longitude];
      })
      
  }
}
