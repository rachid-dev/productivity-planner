import { TestBed } from '@angular/core/testing';

import { RegisterUserUseCase } from './register-user.use-case';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/port/authentication.service';
import { UserService } from '@app/core/port/user.service';
import { UserStore } from '@app/core/store/user.store';
import { of } from 'rxjs';
import { EmailAlreadyTakenError } from './email-already-taken.error';


describe('RegisterUserUseCase', () => {
  let registerUserUseCase: RegisterUserUseCase;
  let authenticationService : AuthenticationService;
  let userService : UserService;
  let userStore : UserStore;
  let router : Router;

  let mockUserId = "123";
  let mockEmail = "john.doe@acme.com";
  let mockPassword = "Azerty@1";
  let mockJwtToken = "jwtToken";
  let mockJwtRefreshToken = "jwtRefreshToken";
  let mockExpiresIn = "expiresIn";

  let mockRegisterPayload = {
    jwtToken: mockJwtToken,
    jwtRefreshToken: mockJwtRefreshToken,
    expiresIn: mockExpiresIn,
    userId: mockUserId
  };

  let mockVisitor = {
    name : "John",
    email : mockEmail,
    password : mockPassword
  };

  let mockUser = {
    id : mockUserId,
    name : "John",
    email : mockEmail,
  };


  describe('when visitor provides valid info', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers : [
          RegisterUserUseCase,
          { provide: AuthenticationService, useValue: { register: jest.fn().mockReturnValue(of(mockRegisterPayload))}},
          { provide: UserService, useValue: { create: jest.fn().mockReturnValue(of(undefined))}},
          { provide: UserStore, useValue: { load: jest.fn() }},
          { provide: Router, useValue: { navigate: jest.fn() }},
        ]
      });
      registerUserUseCase = TestBed.inject(RegisterUserUseCase);
      authenticationService = TestBed.inject(AuthenticationService);
      userService = TestBed.inject(UserService);
      userStore = TestBed.inject(UserStore);
      router = TestBed.inject(Router);
      localStorage.clear();
    });

    it('should register visitor via AuthenticationService', async () => {
      await registerUserUseCase.execute(mockVisitor);
      expect(authenticationService.register).toHaveBeenCalledWith(mockEmail, mockPassword);
    });

    it('should add info to webapp storage', async () => {
      await registerUserUseCase.execute(mockVisitor);
      expect(localStorage.getItem('jwtToken')).toBe(mockJwtToken);
      expect(localStorage.getItem('jwtRefreshToken')).toBe(mockJwtRefreshToken);
      expect(localStorage.getItem('expiresIn')).toBe(mockExpiresIn);
    });

    it('should create new user via UserService', async () =>{
      await registerUserUseCase.execute(mockVisitor);
      expect(userService.create).toHaveBeenCalledWith(mockUser, mockJwtToken);
    });

    it('should load new user in the store via UserStore', async () => {
      await registerUserUseCase.execute(mockVisitor);
      expect(userStore.load).toHaveBeenCalledWith(mockUser);
    });

    it('should navigate to dashboard', async () => {
      await registerUserUseCase.execute(mockVisitor);
      expect(router.navigate).toHaveBeenCalledWith(['/app/dashboard']);
    });
  });

  describe('when visitor provides an already taken email', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers : [
          RegisterUserUseCase,
          UserService,
          UserStore,
          Router,
          { provide: AuthenticationService, useValue: { register: jest.fn().mockReturnValue(of(new EmailAlreadyTakenError(mockEmail)))} },
        ]
      });
      registerUserUseCase = TestBed.inject(RegisterUserUseCase);
    });

    it('should throw EmailAlreadyTakenError', async () => {
      await expect(registerUserUseCase.execute(mockVisitor)).rejects.toThrow(EmailAlreadyTakenError);
    });
  });
});
