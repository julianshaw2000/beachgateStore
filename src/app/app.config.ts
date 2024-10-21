import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideHttpClient } from '@angular/common/http';
import { getStorage, provideStorage } from '@angular/fire/storage';  // Import Firebase Storage

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSRiugbGaU9pJnMBwEEYANLKatTjIFFYY",
  authDomain: "beachgate-6dfab.firebaseapp.com",
  projectId: "beachgate-6dfab",
  storageBucket: "beachgate-6dfab.appspot.com",
  messagingSenderId: "223786492080",
  appId: "1:223786492080:web:ffa19efa12b8ed723fdb75"
};

// Application-wide configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),  // Ensure HttpClient is provided
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),

    provideFirestore(() => getFirestore()),  // Firestore
    provideStorage(() => getStorage())  // Firebase Storage
  ]
};
