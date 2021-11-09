import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignleBookComponent } from './signle-book.component';

describe('SignleBookComponent', () => {
  let component: SignleBookComponent;
  let fixture: ComponentFixture<SignleBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignleBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignleBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
