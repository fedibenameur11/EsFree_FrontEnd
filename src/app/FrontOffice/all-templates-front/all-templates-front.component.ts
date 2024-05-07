import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-all-templates-front',
  templateUrl: './all-templates-front.component.html',
  styleUrls: ['./all-templates-front.component.css']
})
export class AllTemplatesFrontComponent implements OnInit {

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
 
  }



}
