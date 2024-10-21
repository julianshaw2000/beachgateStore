import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritysheetComponent } from './securitysheet.component';

describe('SecuritysheetComponent', () => {
  let component: SecuritysheetComponent;
  let fixture: ComponentFixture<SecuritysheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecuritysheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecuritysheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
