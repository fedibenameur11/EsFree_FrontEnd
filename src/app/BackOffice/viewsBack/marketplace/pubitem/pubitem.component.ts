import { Component, OnInit } from '@angular/core';
import { Etat, PubItem } from 'src/app/Models/pubitem';
import { PubitemService } from 'src/app/Services/pubitem.service';




@Component({
  selector: 'app-pubitem',
  templateUrl: './pubitem.component.html',
  styleUrls: ['./pubitem.component.css']
})
export class PubitemComponent implements OnInit {
  
  constructor(private pubItemService: PubitemService) {}
  public pubItems: Array<PubItem> =[];
  searchText: string = ''
  etatOptions = Object.values(Etat);
  selectedEtat!: Etat;
  pubItem: PubItem = new PubItem();
  productAddedSuccessfully: boolean = false;


  

  ngOnInit(): void {
    this.loadPubItems(); // Load items when component initializes
  }

  loadPubItems(): void {
    this.pubItemService.getPubitems().subscribe(
      (data) => {
        this.pubItems = data;
      },
      (error) => {
        console.error('Error fetching pub items:', error);
      }
    );
  }

  deleteItem(itemId: number) {
    this.pubItemService.deletePubitem(itemId).subscribe(
      () => {
        console.log('Item deleted successfully');
        // Reload items after successful deletion
        this.loadPubItems();
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }


 // addProduct() {
   // const pubItem: PubItem = {
    //  name: this.pubItem.name,
      //description: this.pubItem.description,
      //prix: this.pubItem.prix,
      //numTelephone: this.pubItem.numTelephone,
      //image: this.pubItem.image,
      //etat: this.selectedEtat
    //};

    //this.pubItemService.addPubitem(pubItem).subscribe(
      //(response) => {
        //console.log('Product added successfully:', response);
        //this.loadPubItems();
      //},
      //(error) => {
        //console.error('Error adding product:', error);
      //}
    //);
  //}

  openUpdateModal(pubItem: PubItem) {
    console.log('Selected PubItem:', pubItem);
    this.pubItem = new PubItem(); // Create a new instance
    Object.assign(this.pubItem, pubItem); // Copy properties from selected pubItem
    this.selectedEtat = pubItem.etat;
  }

  onEtatChange(event: any) {
    const newValue = event?.target?.value;
    if (newValue !== undefined) {
      this.pubItem.etat = newValue;
    }
  }

  updateProduct() {
    this.pubItemService.updatePubItem(this.pubItem).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
        this.loadPubItems();
        
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }


  searchProducts() {
    if (this.searchText.trim() !== '') {
        this.pubItemService.searchPubItems(this.searchText).subscribe(products => {
            this.pubItems = products;
        });
    } else {
        // If search text is empty, fetch all products
        this.pubItemService.getPubitems().subscribe(products => {
            this.pubItems = products;
        });
    }
}
addPubItemm(): void {
  this.pubItem.etat = this.selectedEtat;
  this.pubItemService.addPubItemm(this.pubItem).subscribe(
    (data: PubItem) => {
      console.log('PubItem added successfully:', data);
      this.productAddedSuccessfully = true;
      this.pubItem = new PubItem();
      this.loadPubItems();
      setTimeout(() => {
        this.productAddedSuccessfully = false;
      }, 3000);
      
    },
    (error) => {
      console.error('Error adding PubItem:', error);
    }
  );
}


}

