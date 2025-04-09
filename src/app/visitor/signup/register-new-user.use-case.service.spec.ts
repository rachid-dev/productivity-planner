import { TestBed } from '@angular/core/testing';

import { RegisterNewUserUseCaseService } from './register-new-user.use-case.service';

describe('RegisterNewUserUseCaseService', () => {
  let service: RegisterNewUserUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterNewUserUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
