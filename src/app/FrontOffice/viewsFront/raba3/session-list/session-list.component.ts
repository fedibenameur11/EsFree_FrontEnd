import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Raba3 } from 'src/app/Models/raba3';
import { Raba3Service } from 'src/app/Services/raba3.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit{
  idJeux!: number
  newSession: Raba3 = new Raba3(); 
  showAddDialog: boolean = false;


  openAddDialog() {
    this.showAddDialog = true;
  }

  closeAddDialog() {
    this.showAddDialog = false;
  }
  

  raba3: Raba3 = new Raba3();
  constructor(private act:ActivatedRoute,private raba3Service:Raba3Service , private router: Router,private dialog :MatDialog){ }
  public sessions: Array<Raba3> =[];


  ngOnInit(): void {
    this.act.paramMap.subscribe(params => {
      this.idJeux = this.act.snapshot.params['idJeux']
    });

    this.getListSessions(this.idJeux);
    
  }


  getListSessions(idJeux:number)
  {
   this.raba3Service.getListSessions(this.idJeux).subscribe(
     (d) => {
      d.forEach((type:Raba3) =>
       {
         console.log(type.idRaba3);
         console.log(type.description);
         console.log(type.nombrePlaces);
         console.log(type.dateDebut);
         console.log(type.dateFin);
        
         this.sessions = d ;
       })
     },
     (error) => 
       {
         console.error(error);
       }
     );
    }

    getNumberArray(count: number): number[] {
      return Array.from({ length: 4 - count }, (_, i) => 4 - i);
    }
    

    addGameSessionAndAssignToGame(): void {
      this.raba3Service.addGameSessionAndAssignToGame(this.newSession, this.idJeux)
        .subscribe(response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Game Session added Successfully !',
            showConfirmButton: false,
            timer: 1500})
          this.showAddDialog = false;
          window.location.reload();
        });


    }
    shareOnFacebook() {
      const urlToShare = 'https://virtiverse.com'; // URL to share
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
      window.open(facebookShareUrl, 'join us in this game session !!');
    }
    
}


