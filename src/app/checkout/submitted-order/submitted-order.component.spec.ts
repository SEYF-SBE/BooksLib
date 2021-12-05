import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedOrderComponent } from './submitted-order.component';

describe('SubmittedOrderComponent', () => {
  let component: SubmittedOrderComponent;
  let fixture: ComponentFixture<SubmittedOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
