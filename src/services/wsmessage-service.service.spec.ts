import { TestBed } from '@angular/core/testing';

import { WSMessageServiceService } from './wsmessage-service.service';

describe('WSMessageServiceService', () => {
  let service: WSMessageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WSMessageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
