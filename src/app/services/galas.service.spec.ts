import { TestBed } from '@angular/core/testing';

import { GalasService } from './galas.service';

describe('GalasService', () => {
  let service: GalasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
