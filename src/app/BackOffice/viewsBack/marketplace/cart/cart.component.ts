import { Component} from '@angular/core';
import { PubItem } from 'src/app/Models/pubitem';
import { Cart } from 'src/app/Models/cart';
import { CartService } from 'src/app/Services/cart.service';
import { NgbModal,NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products: PubItem[] = [];
  carts: Cart[] = [];
  filteredCarts: Cart[] = [];
  searchQuery: string = ''
  @ViewChild('myModal') modalElement!: ElementRef;
  

  
  constructor( private modalService: NgbModal, private cartService: CartService ,private router : Router) { }

  ngOnInit(): void {
    this.fetchCartsWithProducts();
  }

  fetchCartsWithProducts(): void {
    this.cartService.getAllCartsWithProducts().subscribe(
      (data: Cart[]) => {
        this.carts = data;
        this.applySearchFilter();
      },
      (error) => {
        console.error('Error fetching carts with products:', error);
      }
    );
  }
  performSearch(): void {
    this.applySearchFilter();
  }

  applySearchFilter(): void {
    if (!this.searchQuery) {
      this.filteredCarts = [...this.carts];
    } else {
      this.cartService.searchCarts(undefined, undefined, this.searchQuery).subscribe(
        (data: Cart[]) => {
          this.filteredCarts = data;
        },
        (error) => {
          console.error('Error searching carts:', error);
        }
      );
    }
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

 
  openCartDetails(cartId: number) {
    this.cartService.getProductsInCart(cartId).subscribe(products => {
      this.products = products;
      this.modalService.open(this.modalElement, { size: 'lg', backdrop: false });
    });
  }



  }
  

