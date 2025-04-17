import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationFirebaseService } from '../adapter/authentication-firebase.service';
import { EmailAlreadyTakenError } from 'src/app/visitor/signup/domain/email-already-taken.error';
import { InvalidCredentialError } from '@app/visitor/login/domain/invalid-credential.error';

export type RegisterResponse = RegisterPayload | EmailAlreadyTakenError;
export type LoginResponse = LoginPayload | InvalidCredentialError;
interface RegisterPayload{ 
  jwtToken: string;
  jwtRefreshToken: string;
  expiresIn: string;
  userId: string;
}
interface LoginPayload{
  jwtToken: string;
  jwtRefreshToken: string;
  expiresIn: string;
  userId: string;
  isRegistered: boolean;
}

@Injectable(
  {
    providedIn : 'root',
    useClass : AuthenticationFirebaseService
  }
)
export abstract class AuthenticationService {

  abstract register(email:string, password:string):Observable<RegisterResponse>;


  abstract login(email:string, password:string):Observable<LoginResponse>;

}
