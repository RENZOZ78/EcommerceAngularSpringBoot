import { TestBed } from '@angular/core/testing';

import { SportManShopFormService } from './sport-man-shop-form.service';

describe('SportManShopFormService', () => {
  let service: SportManShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportManShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
