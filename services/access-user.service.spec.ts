import { TestBed, inject } from '@angular/core/testing';

import { AccessUserService } from './access-user.service';

describe('AccessUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessUserService]
    });
  });

  it('should be created', inject([AccessUserService], (service: AccessUserService) => {
    expect(service).toBeTruthy();
  }));
});
