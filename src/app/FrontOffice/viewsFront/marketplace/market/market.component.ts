import { Component, OnInit } from '@angular/core';
import { PubItem } from 'src/app/Models/pubitem';
import { PubitemService } from 'src/app/Services/pubitem.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  pubItems: PubItem[] = [];
  etat: string = '';

  constructor(private pubItemService: PubitemService) { }


  ngOnInit(): void {
    this.retrieveAllPubItems();
  }

  retrieveAllPubItems(): void {
    this.pubItemService.getPubitems().subscribe(pubItems => {
      this.pubItems = pubItems;
    });
  }

}
