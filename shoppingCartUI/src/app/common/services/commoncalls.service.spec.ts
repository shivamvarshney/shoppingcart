import { TestBed, inject } from '@angular/core/testing';

import { CommoncallsService } from './commoncalls.service';

describe('CommoncallsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommoncallsService]
    });
  });

  it('should be created', inject([CommoncallsService], (service: CommoncallsService) => {
    expect(service).toBeTruthy();
  }));
});
