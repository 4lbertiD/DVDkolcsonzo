import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DvdinfoComponent } from './dvdinfo.component';

describe('DvdinfoComponent', () => {
  let component: DvdinfoComponent;
  let fixture: ComponentFixture<DvdinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DvdinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DvdinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
