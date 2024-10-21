import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestImageDialogComponent } from './guest-image-dialog.component';

describe('GuestImageDialogComponent', () => {
  let component: GuestImageDialogComponent;
  let fixture: ComponentFixture<GuestImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestImageDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
