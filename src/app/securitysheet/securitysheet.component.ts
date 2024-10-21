
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, inject, NgModule, OnInit } from '@angular/core';
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

import { HttpClient } from '@angular/common/http';
// import { AppConfigService } from './app-config.service';
import { AppConfigService } from '../app-config.service';
import { CameraDialogComponent } from '../camera-dialog/camera-dialog.component';
// import { CameraDialogComponent } from './camera-dialog/camera-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FirebaseService } from '../_service/firebase.service';
import { Guest } from '../_types/guest';


@Component({
  selector: 'app-securitysheet',
  standalone: true,
  imports: [RouterOutlet, CommonModule,
    MatButtonModule,  // Import Material Button Module
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule

  ],
  templateUrl: './securitysheet.component.html',
  styleUrl: './securitysheet.component.scss'
})


export class SecuritysheetComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  currentDateTime: string | undefined;
  shellyDeviceUrl: string = '';  // Store the Shelly Device URL once the config is loaded
  capturedImage: string | null = null;
  private _snackBar = inject(MatSnackBar);


  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private http: HttpClient,
    private firebaseService: FirebaseService,
    private configService: AppConfigService) { }

  ngOnInit(): void {
    // Automatically add current date and time to the form when initialized
    const now = new Date();
    this.currentDateTime = now.toISOString();

    // Define form fields and their default values
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      apartment: [''],
      validation: ['none', Validators.required],
      enterdate: [this.currentDateTime],
      url: [''],  // Optional URL or image link field
    });

    // Load the config after the form is ready
    // this.loadConfig();
  }





  // Method to load the config
  loadConfig(): void {
    this.configService.loadConfig().then(() => {
      //   // Access the Shelly device URL after the config is loaded
      //   this.shellyDeviceUrl = this.configService.shellyDeviceUrl;
      //   console.log('Shelly Device URL loaded:', this.shellyDeviceUrl);
    });
  }



  openCameraDialog(): void {
    const dialogRef = this.dialog.open(CameraDialogComponent, {
      width: '500px',
      height: '500px',
      disableClose: true // Ensures the dialog is modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.capturedImage = result; // Save the captured image data
      }
      else {
        this.capturedImage = null; // Reset the captured image data
      }
    });
  }


  // Example function to send a request to the Shelly device
  openGate(): void {
    let message = 'Gate opened successfully';
    if (this.shellyDeviceUrl) {
      this.http.get(this.shellyDeviceUrl).subscribe(
        response => {
          console.log('Gate opened successfully:', response);
          this._snackBar.open(message, "Gate", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar']
          });

        },
        error => {
          // console.error('Error opening gate:', error);
        }
      );
    } else {
      console.error('Shelly Device URL is not available yet.');

      this._snackBar.open("Error openig gate", "Gate", {
        duration: 3000,
      });
    }
  }


  onSubmit(): void {
    if (this.form.valid) {
      const newGuest: Guest = {
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        apartment: this.form.value.apartment,
        validation: this.form.value.validation,
        enterdate: this.form.value.enterdate,  // Date object
        url: this.form.value.url || '',  // Optional URL or image field
      };

      // Call Firebase service to add the guest
      this.firebaseService.addGuest(newGuest)
        .then(() => {
          console.log('Guest added successfully:', newGuest);
          this._snackBar.open('Guest added successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar']
          });
          this.form.reset();  // Reset form after submission
        })
        .catch(error => {
          console.error('Error adding guest:', error);
          this._snackBar.open('Error adding guest', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['error-snackbar']
          });
        });
    } else {
      this._snackBar.open('Please fill all required fields', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['error-snackbar']
      });
    }
  }






  // Getters for form controls
  get firstname() {
    return this.form.get('firstname');
  }

  get lastname() {
    return this.form.get('lastname');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get apartment() {
    return this.form.get('apartmentNumber');
  }

  get termsAccepted() {
    return this.form.get('termsAccepted');
  }

  get validation() {
    return this.form.get('validationDocument');
  }

  get enterdate() {
    return this.form.get('dateTime');
  }

}
