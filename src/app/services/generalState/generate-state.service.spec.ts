import { TestBed } from '@angular/core/testing';

import { GeneralStateService } from './general-state.service';

describe('MenuStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralStateService = TestBed.get(GeneralStateService);
    expect(service).toBeTruthy();
  });
});
