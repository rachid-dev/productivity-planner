import { TestBed } from '@angular/core/testing';

import { LoginUserUseCase } from './login-user.use-case';
import { AuthenticationService } from '@app/core/port/authentication.service';
import { UserService } from '@app/core/port/user.service';
import { UserStore } from '@app/core/store/user.store';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { InvalidCredentialError } from './invalid-credential.error';

describe('LoginUserUseCaseService', () => {
  let loginUserUseCase: LoginUserUseCase;
  let authenticationService : AuthenticationService;
  let userService : UserService;
  let userStore : UserStore;
  let router : Router;

  const mockUserId = '123';
  const mockJwtToken = 'jwt-token';
  const mockJwtRefreshToken = 'refresh-token';
  const mockExpiresIn = '3600';

  const mockLoginPayload = {
    userId: mockUserId,
    jwtToken: mockJwtToken,
    jwtRefreshToken: mockJwtRefreshToken,
    expiresIn: mockExpiresIn,
  }
  
  const mockUser = { id: mockUserId, name: 'John Doe' };

  beforeEach(() => {
    localStorage.clear();
  });

  describe('when user provides valid credentials', () => {
    
    const email = "john.doe@acme.com";
    const password = "Azerty1@";

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers : [
          LoginUserUseCase,
          { provide: AuthenticationService, useValue: { login: jest.fn().mockReturnValue(of(mockLoginPayload))}},
          { provide: UserService, useValue: { fetch: jest.fn().mockReturnValue(of(mockUser))}},
          { provide: UserStore, useValue: { load: jest.fn() }},
          { provide: Router, useValue: { navigate: jest.fn() }},
        ]
      });
      loginUserUseCase = TestBed.inject(LoginUserUseCase);
      authenticationService = TestBed.inject(AuthenticationService);
      userService = TestBed.inject(UserService);
      userStore = TestBed.inject(UserStore);
      router = TestBed.inject(Router);
    });

    it('should authenticate the user via AuthenticationService', async () => {
      await loginUserUseCase.execute(email, password);
      expect(authenticationService.login).toHaveBeenCalledWith(email, password);   
    });

    it('should store jwt tokens in localStorage', async () => {
      await loginUserUseCase.execute(email, password);
      expect(localStorage.getItem('jwtToken')).toBe(mockJwtToken);
      expect(localStorage.getItem('jwtRefreshToken')).toBe(mockJwtRefreshToken);
      expect(localStorage.getItem('expiresIn')).toBe(mockExpiresIn);
    });

    it('should fetch the user info via UserService', async () => {
      await loginUserUseCase.execute(email, password);
      expect(userService.fetch).toHaveBeenCalledWith(mockUserId, mockJwtToken);
    });

    it('should load the user into the store', async () => {
      await loginUserUseCase.execute(email, password);
      expect(userStore.load).toHaveBeenCalledWith(mockUser);
    });

    it('should navigate to dashboard', async () => {
      await loginUserUseCase.execute(email, password);
      expect(router.navigate).toHaveBeenCalledWith(['/app/dashboard']);
    });
  });

  describe('when user provides invalid credentials', () => {
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers : [
          LoginUserUseCase,
          Router,
          UserStore,
          UserService,
          { provide: AuthenticationService, useValue: { login: jest.fn().mockReturnValue(of(new InvalidCredentialError()))}},

        ]
      });
      loginUserUseCase = TestBed.inject(LoginUserUseCase);
    });

    it('should throw InvalidCredentialError', async () => {
      await expect(loginUserUseCase.execute("invalid-email", "invalid-password")).rejects.toThrow(InvalidCredentialError);
    });
  });
});
