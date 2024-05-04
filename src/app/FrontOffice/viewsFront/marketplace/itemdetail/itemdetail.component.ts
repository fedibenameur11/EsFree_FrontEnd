import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PubItem } from 'src/app/Models/pubitem';
import { CartService } from 'src/app/Services/cart.service';
import { PubitemService } from 'src/app/Services/pubitem.service';

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemdetail.component.html',
  styleUrls: ['./itemdetail.component.css']
})
export class ItemdetailComponent implements OnInit{

  pubItem!: PubItem;

  constructor(
    private route: ActivatedRoute,
    private pubitemService: PubitemService,
    private cartService: CartService,
    public snackBar: MatSnackBar
  ) { }
  
  ngOnInit(): void {
 this.getPubItemById();
  }

  getPubItemById(): void {
    const id_pubString = this.route.snapshot.paramMap.get('id_pub'); // Retrieve item ID from URL parameter as string
    if (id_pubString) {
      const id_pub = +id_pubString; // Convert string to number
      this.pubitemService.getPubItemById(id_pub)
        .subscribe(pubItem => {
          this.pubItem = pubItem; // Assign fetched item data to pubItem variable
        });
    } else {
      console.error('Item ID is missing.');
    }
  }

  addToCart(itemId: number): void {
    const cartId = 1; // Assuming you have a fixed cart ID for now, you can replace it with dynamic logic if needed
    this.cartService.addItemToCart(cartId, itemId).subscribe(
      response => {
        // Handle successful addition to cart
        console.log(response);
        
  
      },
      error => {
        // Handle error, if any
        console.error(error);
      }
    );
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open('Item added to cart', 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }
}
