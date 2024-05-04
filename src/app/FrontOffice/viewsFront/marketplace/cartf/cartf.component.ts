import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Cart } from 'src/app/Models/cart';
import { PubItem } from 'src/app/Models/pubitem';
import { CartService } from 'src/app/Services/cart.service';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-cartf',
  templateUrl: './cartf.component.html',
  styleUrls: ['./cartf.component.css']
})
export class CartfComponent implements OnInit {

  cartItems: PubItem[] = [];
  userId = 1; 
  handler:any = null;

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef, private httpClient:HttpClient) { }
  ngOnInit(): void {
    this.getCartItemsForUser();
  }

  getCartItemsForUser(): void {
    this.cartService.getPubItemsInCartByUserId(this.userId).subscribe(
      (pubItems: PubItem[]) => {
        this.cartItems = pubItems;
        console.log('Cart items retrieved:', this.cartItems);
      },
      (error: any) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  calculatePriceOfItems(): number {
    return this.cartItems.reduce((total, item) => total + item.prix, 0);
  }

  removeItemFromCart(itemId: number): void {
    this.cartService.removeItemFromCart(this.userId, itemId).pipe(
      switchMap(() => this.cartService.getPubItemsInCartByUserId(this.userId))
    ).subscribe(
      (pubItems: PubItem[]) => {
        this.cartItems = pubItems;
        this.cdr.detectChanges(); // Trigger change detection
      },
      (error: any) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }

  pay(amount: any) {    
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
      locale: 'auto',
      token: (token: any) => {
        // This will be called when the user successfully completes the payment
        this.handleToken(token, amount);
      }
    });

 
    handler.open({
      name: 'Stripe payment',
      description: 'enter your card credentials',
      amount: amount * 100
    });
 
  }
  handleToken(token: any, amount: any) {
    // Construct the URL with query parameters
    const url = `http://localhost:8082/payments/create-payment-intent?amount=${amount}&currency=usd`;
  
    // Make the HTTP POST request to the backend server
    this.httpClient.post(url, null)
      .subscribe(
        (response: any) => {
          console.log('Payment intent created:', response);
          // Handle success
          alert('Payment Successful!');
        },
        (error: any) => {
          console.error('Failed to create payment intent:', error);
        }
      );
  }
  }
