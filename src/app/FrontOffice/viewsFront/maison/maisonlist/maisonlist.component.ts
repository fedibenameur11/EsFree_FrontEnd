import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Maison } from 'src/app/Models/maison';
import { MaisonService } from 'src/app/Services/maison.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/Models/user';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

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
  showUpdateDialog: boolean = false;
  demandeur!:User;
  maisonsDisponibles: Maison[]=[];
  maisons!: any[];
  priceRange: number = 0;
  minPrice: number = 0;
  maxPrice: number = 2000;
  sortDirection: string = 'asc';
  sortOrder: string = 'asc'; 
  totalPages: number = 0;
  pageNumber: number = 0;
  pageSize: number = 6; 
  map: any;


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

  constructor(private maisonService: MaisonService, private router: Router,private dialog :MatDialog,private http: HttpClient) {
    this.newMaison.user = {
      userName: 'fedi',
      userFirstName: 'fedi',
      userLastName: 'fedi',
      userPassword: 'fedi',
      roles :[]
    };
    this.demandeur ={
      userName: 'fedi4',
      userFirstName: 'fedibbbbbbbbbbbb',
      userLastName: 'fedi',
      userPassword: 'fedi',
      roles :[]

    }
  }
  ngOnInit(){
    this.listMaisons(this.pageNumber);
    this.initMap(); 
  }
  listMaisons(pageNumber: number): void {
    this.maisonService.findAllMaisons().subscribe(
      maisons => {
        // Filtrer les maisons avec un nombre de places disponibles > 0 et dans la plage de prix sélectionnée
        this.maisonsDisponibles = maisons.filter(maison => maison.nbrplacedispo > 0 && maison.prix >= this.minPrice && maison.prix <= this.maxPrice);
  
        // Trier les maisons en fonction de sortOrder
        if (this.sortOrder === 'asc') {
          this.maisonsDisponibles.sort((a, b) => a.prix - b.prix);
        } else if (this.sortOrder === 'desc') {
          this.maisonsDisponibles.sort((a, b) => b.prix - a.prix);
        }
  
        // Recalculer le nombre total de pages
        this.recalculateTotalPages(this.maisonsDisponibles.length);
  
        // Découper les maisons en pages
        const chunkedMaisons = this.chunkArray(this.maisonsDisponibles, this.pageSize);
  
        // Sélectionner la page spécifique
        this.maisonsDisponibles = chunkedMaisons[pageNumber];
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
      window.location.reload();
      
    });
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
    window.location.reload();
  }

  deleteMaison(idMaison: number): void {
    this.maisonService.deleteMaison(idMaison).subscribe(() => {
      console.log("Maison supprimé avec succés");
    }, (error) => {
      console.log("Echec dasn la suppression de cette maison ");
    });
    window.location.reload();
  }

  reserverMaison(maisonId: number, demandeur: User): void {
    this.maisonService.ajouterDemandeur(maisonId, demandeur)
      .subscribe(() => {
        // Affichez une alerte de succès pour la demande envoyée
        Swal.fire('Success!', 'Demande envoyée avec succès', 'success');
        console.log('Demandeur ajouté avec succès');
      }, (error) => {
        console.error('Erreur dans l\'Envoie de cette demande. : ', error);
        // Affichez une alerte d'erreur en cas d'échec de l'ajout du demandeur
        Swal.fire('Error!', 'Erreur dans l\'Envoie de cette demande.', 'error');
      });
      this.http.post<any>('http://localhost:8079/send-sms', {}).subscribe(
      response => {
        console.log('SMS envoyé avec succès');
      },
      error => {
        console.error('Erreur lors de l\'envoi du SMS :', error);
      }
    );
      
  }

  onRangeChange(pageNumber: number) {
    this.listMaisons(pageNumber);
}
  sortMaisons(pageNumber: number) {
    this.listMaisons(pageNumber); // Rechargez les maisons lorsque l'ordre de tri change
  }
  chunkArray(array: any[], pageSize: number): any[] {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += pageSize) {
      chunkedArray.push(array.slice(i, i + pageSize));
    }
    return chunkedArray;
  }

  isNextButtonDisabled(): boolean {
    return this.pageNumber >= this.totalPages - 1;
  }
  isPreviousButtonDisabled(): boolean {
    return this.pageNumber <= 0;
  }

  // Méthode pour recalculer le nombre total de pages
  recalculateTotalPages(totalMaisons: number): void {
    this.totalPages = Math.ceil(totalMaisons / this.pageSize);
  }
  loadMaisons(pageNumber: number): void {
    this.pageNumber = pageNumber; 
    this.listMaisons(pageNumber); 
  }
  initMap(): void {
    this.map = L.map('map').setView([36.900933647068676, 10.184360909117451], 15); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }
  }
