import { TestBed } from '@angular/core/testing';

import { ConnectivityCheckService } from './connectivity-check.service';

describe('ConnectivityCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectivityCheckService = TestBed.get(ConnectivityCheckService);
    expect(service).toBeTruthy();
  });
});
