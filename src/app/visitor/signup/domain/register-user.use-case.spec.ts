import { TestBed } from '@angular/core/testing';

import { RegisterUserUseCase } from './register-user.use-case';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/port/authentication.service';
import { UserService } from '@app/core/port/user.service';
import { UserStore } from '@app/core/store/user.store';


describe('RegisterNewUserUseCaseService', () => {
  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers : [
        RegisterUserUseCase,
        { provide: AuthenticationService, useValue: { register: jest.fn()}},
        { provide: UserService, useValue: { create: jest.fn()}},
        { provide: UserStore, useValue: { load: jest.fn() }},
        { provide: Router, useValue: { navigate: jest.fn() }},
      ]
    });
    registerUserUseCase = TestBed.inject(RegisterUserUseCase);
  });

  it('should be created', () => {
    expect(registerUserUseCase).toBeTruthy();
  });

  describe('when visitor provides valid info', () => {
    it.todo('should register visitor via AuthenticationService');
    it.todo('should add info to webapp storage');
    it.todo('should create new user via UserService');
    it.todo('should load new user in the store via UserStore');
    it.todo('should navigate to dashboard');
  });

  describe('when visitor provides an already taken email', () => {
    it.todo('should throw EmailAlreadyTakenError');
  });
});
