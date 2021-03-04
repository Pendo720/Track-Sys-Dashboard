import { TestBed } from '@angular/core/testing';

import { PlaceHolderDataService } from './place-holder-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlaceHolderDataService', () => {
  let service: PlaceHolderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PlaceHolderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
