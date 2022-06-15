import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVDManagementComponent } from './dvd-management.component';

describe('DvdManagementComponent', () => {
  let component: DVDManagementComponent;
  let fixture: ComponentFixture<DVDManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DVDManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DVDManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
