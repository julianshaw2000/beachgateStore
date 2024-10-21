import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { SecuritysheetComponent } from "./securitysheet/securitysheet.component";
import { GuestListComponent } from './guest-list/guest-list.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatTabsModule, SecuritysheetComponent, GuestListComponent],
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {


}
