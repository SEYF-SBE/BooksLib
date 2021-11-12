import { TestBed } from '@angular/core/testing';

import { Order.ServiceService } from './order.service.service';

describe('Order.ServiceService', () => {
  let service: Order.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Order.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
