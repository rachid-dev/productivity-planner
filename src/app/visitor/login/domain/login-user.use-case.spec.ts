import { TestBed } from '@angular/core/testing';

import { LoginUserUseCase } from './login-user.use-case';
import { AuthenticationService } from '@app/core/port/authentication.service';
import { UserService } from '@app/core/port/user.service';
import { UserStore } from '@app/core/store/user.store';
import { Router } from '@angular/router';

describe('LoginUserUseCaseService', () => {
  let service: LoginUserUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers : [
        LoginUserUseCase,
        { provide: AuthenticationService, useValue: { register: jest.fn()}},
        { provide: UserService, useValue: { create: jest.fn( )}},
        { provide: UserStore, useValue: { register: jest.fn() }},
        { provide: Router, useValue: { navigate: jest.fn() }},
      ]
    });
    service = TestBed.inject(LoginUserUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when user provides valid credentials', () => {
    it.todo('should authenticate the user via AuthenticationService');
    it.todo('should store jwt tokens in localStorage');
    it.todo('should fetch the user info via UserService');
    it.todo('should load the user into the store');
    it.todo('should navigate to dashboard');
  });

  describe('when user provides invalid credentials', () => {
    it.todo('should throw InvalidCredentialError');
  });
});
