import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Raba3 } from 'src/app/Models/raba3';
import { Raba3Service } from 'src/app/Services/raba3.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sessions',
  templateUrl: './user-sessions.component.html',
  styleUrls: ['./user-sessions.component.css']
})
export class UserSessionsComponent implements OnInit {
  name: string = "rechpa";
  sessions: Raba3[] = [];
  newSession: Raba3 = new Raba3();

  showUpdateDialog: boolean = false;

  constructor(private act: ActivatedRoute, private raba3Service: Raba3Service, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.act.paramMap.subscribe(params => {
      this.name = params.get('name') || "rechpa";
    });
    this.retrieveGameSessions();

    this.act.paramMap.subscribe(params => {
      const idRaba3 = parseInt(params.get('idRaba3') || '0');
      if (idRaba3) {
        this.openUpdateDialog(idRaba3);
      }
    });
  }

  retrieveGameSessions(): void {
    this.raba3Service.retrieveUserGameSession(this.name).subscribe(
      (sessions: Raba3[]) => {
        this.sessions = sessions;
      },
      (error) => {
        console.error('Error retrieving game sessions:', error);
      }
    );
  }

  openUpdateDialog(idRaba3: number): void {
    this.showUpdateDialog = true;
    this.raba3Service.retieveGameSessionSpecificUser(idRaba3, this.name).subscribe(
      (session: Raba3) => {
        this.newSession = session;
      },
      (error) => {
        console.error('Error retrieving game session:', error);
      }
    );
  }

  closeUpdateDialog(): void {
    this.showUpdateDialog = false;
  }

  onSubmitUpdate(): void {
    this.raba3Service.updateGameSession(this.newSession.idRaba3, this.newSession).subscribe(
      () => {
        console.log('Game session updated', this.newSession);
        this.closeUpdateDialog();
        this.retrieveGameSessions(); // Refresh the list after update
      },
      (error) => {
        console.error('Failed to update game session:', error);
      }
    );
  }

  deleteGameSession(idRaba3: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this game session?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.raba3Service.deleteGameSession(idRaba3).subscribe(
          () => {
            this.sessions = this.sessions.filter(session => session.idRaba3 !== idRaba3);
            Swal.fire('Deleted!', 'Your game session has been deleted.', 'success');
          },
          (error) => {
            console.error('Error deleting game session:', error);
            Swal.fire('Error!', 'Failed to delete the game session', 'error');
          }
        );
      }
    });
  }

  getNumberArray(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

}
