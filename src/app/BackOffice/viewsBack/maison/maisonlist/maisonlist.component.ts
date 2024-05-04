import { Component,ElementRef, ViewChild  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Maison } from 'src/app/Models/maison';
import { MaisonService } from 'src/app/Services/maison.service';
import { MatDialog } from '@angular/material/dialog';
declare var google: any;
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
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  DEFAULT_LATITUDE = 36.8065; // Coordonnées approximatives de Tunis, Tunisie
  DEFAULT_LONGITUDE = 10.1815;
  openAddDialog() {
    this.showAddDialog = true;
    this.initMap();
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

  initMap(): void {
    const mapOptions = {
      center: { lat: this.DEFAULT_LATITUDE, lng: this.DEFAULT_LONGITUDE },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

    // Ajoutez un écouteur d'événement de clic pour récupérer les coordonnées lorsque vous cliquez sur la carte
    map.addListener('click', (event: google.maps.MouseEvent) => {
      const clickedLocation = event.latLng;
      console.log('Coordonnées de la maison:', clickedLocation.lat(), clickedLocation.lng());
      // Vous pouvez faire ce que vous voulez avec les coordonnées ici, comme les stocker dans une variable de composant
    });
  }
  
  
}
