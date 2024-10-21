<div class="container">
  <!-- <h1>Carib Camera Security</h1> -->

  <!-- Gate Button Section -->
  <mat-card class="mat-elevation-z8 gate-card">
    <mat-card-content>
      <button mat-raised-button color="accent" (click)="openGate()">
        Open Gate
      </button>
    </mat-card-content>
  </mat-card>

  <mat-divider></mat-divider>

  <!-- Form Section -->

  <mat-card class="mat-elevation-z8 gate-card">
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>First Name</mat-label>
        <input
          matInput
          formControlName="firstName"
          placeholder="Enter your first name"
        />
        <mat-error *ngIf="firstName?.invalid && firstName?.touched">
          First name is required
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Last Name</mat-label>
        <input
          matInput
          formControlName="lastName"
          placeholder="Enter your last name"
        />
        <mat-error *ngIf="lastName?.invalid && lastName?.touched">
          Last name is required
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Apartment Number</mat-label>
        <input
          matInput
          formControlName="apartmentNumber"
          placeholder="Enter your apartment number (optional)"
        />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Validation Document</mat-label>
        <mat-select formControlName="validationDocument">
          <mat-option value="drivers_license">Driver's License</mat-option>
          <mat-option value="passport">Passport</mat-option>
          <mat-option value="other">Other</mat-option>
          <mat-option value="none">None</mat-option>
        </mat-select>
        <mat-error
          *ngIf="validationDocument?.invalid && validationDocument?.touched"
        >
          Validation document selection is required
        </mat-error>
      </mat-form-field>

      <input type="hidden" formControlName="dateTime" />

      <div>
        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="form.invalid"
        >
          Save
        </button>
        &nbsp;

        <button mat-raised-button color="primary" (click)="openCameraDialog()">
          Open Camera
        </button>
      </div>
    </form>
    <!-- <mat-divider></mat-divider> -->

    <!-- Camera Section -->
    <!-- <h1>Camera Capture</h1> -->
  </mat-card>

  <p style="pad: 0; margin: 0">Created by Julian Shaw 18/10/2024</p>

  <div *ngIf="capturedImage">
    <h3>Captured Image</h3>
    <img [src]="capturedImage" alt="Captured Image" width="300" />
  </div>
</div>
