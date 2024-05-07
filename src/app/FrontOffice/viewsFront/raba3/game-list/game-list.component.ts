import { Component, OnInit } from '@angular/core';
import { Jeux } from 'src/app/Models/Jeux';
import { GameService } from 'src/app/Services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

    jeux: Jeux = new Jeux();
    constructor(private gameService:GameService){ }
    public games: Array<Jeux> =[];
    ngOnInit(): void {
      this.getListGames();
    }
    getListGames()
    {
     this.gameService.getListGames().subscribe(
       (d) => {
        d.forEach((type:Jeux) =>
         {
           console.log(type.idJeux);
           console.log(type.nom);
           console.log(type.typeJeux);
          
           this.games = d ;
         })
       },
       (error) => 
         {
           console.error(error);
         }
       );
      }

  

}
