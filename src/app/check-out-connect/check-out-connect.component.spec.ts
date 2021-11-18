import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutConnectComponent } from './check-out-connect.component';

describe('CheckOutConnectComponent', () => {
  let component: CheckOutConnectComponent;
  let fixture: ComponentFixture<CheckOutConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutConnectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
