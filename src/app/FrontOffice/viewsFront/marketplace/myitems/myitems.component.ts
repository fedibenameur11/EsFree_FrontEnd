import { Component, OnInit } from '@angular/core';
import { Etat, PubItem } from 'src/app/Models/pubitem';
import { PubitemService } from 'src/app/Services/pubitem.service';


@Component({
  selector: 'app-myitems',
  templateUrl: './myitems.component.html',
  styleUrls: ['./myitems.component.css']
})
export class MyitemsComponent implements OnInit  {

  pubItems!: PubItem[];
  pubItem: PubItem = new PubItem();
  etatOptions = Object.values(Etat);
  selectedEtat!: Etat;
  imageFile: File | undefined;



  constructor(private pubitemService: PubitemService) { }

  ngOnInit(): void {
    this.getPubItems();
  }

  getPubItems(): void {
    this.pubitemService.getPubItemsByCurrentUser()
      .subscribe(pubItems => this.pubItems = pubItems);
  }

  deleteItem(itemId: number) {
    this.pubitemService.deletePubitem(itemId).subscribe(
      () => {
        console.log('Item deleted successfully');
        // Reload items after successful deletion
        this.getPubItems();
        location.reload();
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }


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
    this.pubitemService.updatePubItem(this.pubItem).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
        this.getPubItems();
        
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }


  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.imageFile = event.target.files[0];
    }
  }


  onSubmit(): void {
    const formData = new FormData();
    formData.append('pubitem', JSON.stringify(this.pubItem)); // Corrected key name
    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    }
    formData.append('id', '1'); // Assuming staticUserId is always 1
  
    this.pubitemService.addPubItem(formData).subscribe(
      response => {
        console.log('Product added successfully:', response);
        this.pubItems.push(response); // Assuming response is the added PubItem
        this.getPubItems();

      },
      error => {
        console.error('Error adding product:', error);
      }
    );
  }
  
  
  
  


  
  
}
