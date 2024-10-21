import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: any;

  constructor(private http: HttpClient) { }

  // Load the config from the config.json file dynamically
  loadConfig() {
    return this.http.get('/public/config.json').pipe(
      catchError((error: any): any => {
        console.error('Error loading config file', error);
        return of({});
      })
    ).toPromise().then((configData: any) => {
      this.config = configData;
    });
  }

  // Return the Shelly Device URL
  get shellyDeviceUrl(): string {
    return this.config?.shellyDeviceUrl || '';
  }
}
