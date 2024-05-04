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
    this.createCartForUser(1); 
  }

  createCartForUser(userId: number): void {
    this.cartService.createCartForUser(userId).subscribe(
      (cart) => {
        console.log('Cart created successfully:', cart);
      },
      (error) => {
        console.error('Error creating cart:', error);
      }
    );
  }


}
