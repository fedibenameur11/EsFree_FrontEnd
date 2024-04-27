import { Component } from '@angular/core';
import { PubItem } from 'src/app/Models/pubitem';
import { Cart } from 'src/app/Models/cart';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products: PubItem[] = [];
  carts: Cart[] = [];
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.fetchCartsWithProducts();
  }


  fetchCartsWithProducts(): void {
    this.cartService.getAllCartsWithProducts().subscribe(
      (data: Cart[]) => {
        this.carts = data;
      },
      (error) => {
        console.error('Error fetching carts with products:', error);
      }
    );
  }


  deleteCart(cartId: number): void {
    this.cartService.deleteCart(cartId).subscribe(
      (response: string) => {
        console.log(response); 
        this.fetchCartsWithProducts();
      },
      (error) => {
        console.error('Error deleting cart:', error);
      }
    );
  }

}
