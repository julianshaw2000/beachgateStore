import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-camera-dialog',
  standalone: true,
  imports: [MatRadioModule, FormsModule, MatButtonModule],
  templateUrl: './camera-dialog.component.html',
  styleUrls: ['./camera-dialog.component.scss']
})
export class CameraDialogComponent implements OnInit {
  @ViewChild('videoElement') videoElementRef!: ElementRef<HTMLVideoElement>; // Access the video element via ViewChild
  stream: MediaStream | null = null;

  isFrontCamera = true; // Default camera to front

  constructor(public dialogRef: MatDialogRef<CameraDialogComponent>) { }

  ngOnInit(): void {
    this.startCamera();
  }

  // Switch between front and back camera
  switchCamera(): void {
    this.isFrontCamera = !this.isFrontCamera;
    this.stopCamera();
    this.startCamera();
  }

  // Start the camera
  startCamera(): void {
    const constraints = {
      video: {
        facingMode: this.isFrontCamera ? 'user' : { exact: 'environment' }
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        this.stream = stream;
        this.videoElementRef.nativeElement.srcObject = stream;
        this.videoElementRef.nativeElement.play();
      })
      .catch(error => {
        console.error('Error accessing the camera: ', error);
      });
  }

  // Stop the camera when switching or closing
  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  // Capture the image from the video feed
  captureImage(): string {
    const videoElement = this.videoElementRef.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/png'); // Return the image as a base64 string
    }
    return '';
  }

  // Handle "Save" action
  save(): void {
    const imageData = this.captureImage();
    this.stopCamera();
    this.dialogRef.close(imageData); // Return the captured image data
  }

  // Handle "Cancel" action
  cancel(): void {
    this.stopCamera();
    this.dialogRef.close();
  }
}
