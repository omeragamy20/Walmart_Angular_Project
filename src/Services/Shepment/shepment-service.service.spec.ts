import { TestBed } from '@angular/core/testing';

import { ShepmentServiceService } from './shepment-service.service';

describe('ShepmentServiceService', () => {
  let service: ShepmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShepmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
