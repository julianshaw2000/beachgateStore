import { inject, Injectable } from '@angular/core';
import { Timestamp, collection, Firestore, collectionData, addDoc } from '@angular/fire/firestore';
import { finalize, Observable } from 'rxjs';
import { Guest } from '../_types/guest';

import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore = inject(Firestore);
  //storage = inject(AngularFireStorage);  // ***  I had to comment this ****
  guestsCollection = collection(this.firestore, 'guests');

  getGuests() {
    return collectionData(this.guestsCollection, {
      idField: 'id'
    }) as Observable<Guest[]>;
  }


  // Filter guests based on date, last name, and apartment, returning all if filter value is blank
  filterGuests(guests: Guest[], fromDate?: Date, toDate?: Date, lastname?: string, apartment?: string): Guest[] {
    return guests.filter(guest => {
      // Handle guests with no enterdate
      const guestDate = guest.enterdate
        ? (guest.enterdate instanceof Timestamp
          ? guest.enterdate.toDate()  // Convert Firestore Timestamp to JavaScript Date
          : new Date(guest.enterdate)) // In case it is already a JS Date
        : null;

      // Apply filters only if non-empty values are provided, otherwise return all records
      const isAfterFromDate = fromDate ? guestDate && guestDate >= fromDate : true;
      const isBeforeToDate = toDate ? guestDate && guestDate <= toDate : true;
      const matchesLastName = lastname ? guest.lastname.toLowerCase().includes(lastname.toLowerCase()) : true;
      const matchesApartment = apartment ? guest.apartment === apartment : true;

      // If enterdate is blank and no date filters are applied, return the guest
      const validDateFilter = guestDate || (!fromDate && !toDate);

      // Return guests that match the filters
      return validDateFilter && isAfterFromDate && isBeforeToDate && matchesLastName && matchesApartment;
    });
  }




  // // Method to save guest data to Firebase
  // addGuestOld(guest: Guest): Promise<void> {
  //   const guestsCollection = collection(this.firestore, 'guests');
  //   return addDoc(guestsCollection, guest).then(() => {
  //     console.log('Guest added successfully');
  //   }).catch(error => {
  //     console.error('Error adding guest: ', error);
  //   });
  // }


  // Method to save guest data to Firebase

  // Method to save guest data to Firebase


  addGueststore(guest: Guest, capturedImage: string | null): Promise<void> {
    const guestsCollection = collection(this.firestore, 'guests');

    // Convert the guest's date to Firestore's Timestamp format
    const guestData = {
      ...guest,
      enterdate: Timestamp.fromDate(new Date(guest.enterdate)) // Convert JS Date to Firestore Timestamp
    };


    // If there is no captured image, save the guest data directly
    if (!capturedImage) {
      return addDoc(guestsCollection, guestData).then(() => {
        console.log('Guest added successfully without image');
      }).catch(error => {
        console.error('Error adding guest: ', error);
      });
    }


    // If there is a captured image, upload it to Firebase Storage first
    const file = this.base64ToFile(capturedImage, `${guest.lastname}_${guest.apartment}.png`);
    const filePath = `images/${guest.lastname}_${guest.apartment}/${file.name}`;
    /// const fileRef = this.storage.ref(filePath);
    /// const task = this.storage.upload(filePath, file);

    // return addDoc(guestsCollection, guestData).then(() => {
    //   console.log('Guest added successfully');
    // }).catch(error => {
    //   console.error('Error adding guest: ', error);
    // });
    // Return a promise that resolves after the image is uploaded and guest data is saved

    return new Promise<void>((resolve, reject) => {
      // Implementation for image upload and guest data saving
      // This is a placeholder and should be replaced with actual implementation
      console.log('Image upload and guest data saving not implemented');
      reject(new Error('Not implemented'));
    });
    // return new Promise<void>((resolve, reject) => {
    //   task.snapshotChanges().pipe(
    //     finalize(() => {
    //       fileRef.getDownloadURL().subscribe((url) => {
    //         // Update guest data with the image URL
    //         guestData['url'] = url;

    //         // Save guest data with image URL to Firestore
    //         addDoc(guestsCollection, guestData).then(() => {
    //           console.log('Guest added successfully with image');
    //           resolve();
    //         }).catch(error => {
    //           console.error('Error adding guest with image: ', error);
    //           reject(error);
    //         });
    //       }, error => {
    //         console.error('Error getting download URL: ', error);
    //         reject(error);
    //       });
    //     })
    //   ).subscribe();
    // });

  }
  addGuest(guest: Guest): Promise<void> {
    const guestsCollection = collection(this.firestore, 'guests');

    // Convert the guest's date to Firestore's Timestamp format
    const guestData = {
      ...guest,
      enterdate: Timestamp.fromDate(new Date(guest.enterdate)) // Convert JS Date to Firestore Timestamp
    };

    return addDoc(guestsCollection, guestData).then(() => {
      console.log('Guest added successfully');
    }).catch(error => {
      console.error('Error adding guest: ', error);
    });
  }



  // Helper function to convert base64 image to File object
  base64ToFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }


}
