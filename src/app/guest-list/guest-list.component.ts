import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControl } from '@angular/forms';
// import { FirebaseService, Guest } from './firebase.service';
//import { MatDialog } from '@angular/material/dialog';
//import { GuestImageDialogComponent } from './guest-image-dialog.component';
import { FirebaseService } from '../_service/firebase.service';
import { Guest } from '../_types/guest';
import { GuestImageDialogComponent } from '../guest-image-dialog/guest-image-dialog.component';
//import { MatFormFieldModule } from '@angular/material/form-field';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-guest-list',
  standalone: true,
  providers: [DatePipe], // Add DatePipe as a provider

  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
    ScrollingModule,
    CommonModule
  ],
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.scss'],
})
export class GuestListComponent {
  fromDateControl = new FormControl('');
  toDateControl = new FormControl('');
  lastnameControl = new FormControl('');
  apartmentControl = new FormControl('');

  apartments = ['A101', 'B201', 'C301']; // Mock apartment list

  guests: Guest[] = [];
  filteredGuests: Guest[] = []; // Start with no filtered results

  constructor(public datePipe: DatePipe, private firebaseService: FirebaseService, private dialog: MatDialog) { }

  // Apply filters based on user input
  applyFilter(): void {
    const fromDate = this.fromDateControl.value ? new Date(this.fromDateControl.value) : undefined;
    const toDate = this.toDateControl.value ? new Date(this.toDateControl.value) : undefined;
    const lastName = this.lastnameControl.value || '';
    const apartment = this.apartmentControl.value || '';

    // If all filters are empty, return all guests
    if (!fromDate && !toDate && !lastName && !apartment) {
      this.filteredGuests = this.guests;
    } else {
      // Apply the filter to the entire guest list
      this.filteredGuests = this.firebaseService.filterGuests(this.guests, fromDate, toDate, lastName, apartment);
    }
  }

  // Clear specific input field
  clearInput(control: FormControl): void {
    control.setValue('');
  }

  // Open dialog to show guest image
  openImageDialog(guest: Guest): void {
    this.dialog.open(GuestImageDialogComponent, {
      data: { imageUrl: guest.url },
    });
  }

  // On initialization, fetch guests from Firebase but don't display them immediately
  ngOnInit(): void {
    this.firebaseService.getGuests().subscribe((guests: Guest[]) => {
      this.guests = guests;
      this.filteredGuests = []; // Initially no guests are shown
    });
  }

  // Format Firestore Timestamp to display
  formatFirestoreTimestamp(timestamp: any): string {
    if (!timestamp || !timestamp.seconds) {
      return 'Invalid Date'; // Handle missing or invalid timestamp
    }
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

    // Ensure the date is valid before formatting
    if (isNaN(date.getTime())) {
      return 'Invalid Date'; // Handle invalid date
    }

    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss') || 'Invalid Date';
  }
}
