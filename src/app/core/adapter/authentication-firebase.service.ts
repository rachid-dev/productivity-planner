/**
 * Represents the payload of the response received when registering a new user in firebase.
 *  
 * @see https://firebase.google.com/docs/reference/rest/auth?hl=fr#section-create-email-password
 */

import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { EmailAlreadyTakenError } from "@app/visitor/signup/domain/email-already-taken.error";
import { environment } from "@env/environment";
import { Observable, map, catchError, of, throwError } from "rxjs";
import { AuthenticationService, RegisterResponse, LoginResponse } from "../port/authentication.service";
import { InvalidCredentialError } from "@app/visitor/login/domain/invalid-credential.error";

interface FirebaseResponseSignup{ 
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
interface FirebaseResponseSignin{
  displayName: string
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

interface FirebaseResponseRefreshToken{
  expires_in: string,
  token_type: string,
  refresh_token: string,
  id_token: string,
  user_id: string,
  project_id: string
}

@Injectable()
export class AuthenticationFirebaseService implements AuthenticationService{

  readonly #http = inject(HttpClient);

  register(email:string, password:string):Observable<RegisterResponse>{
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`;
    const body={email, password, "returnSecureToken":true};
    
    return this.#http.post<FirebaseResponseSignup>(url, body).pipe(
      map((response) => ({
        jwtToken : response.idToken,
        jwtRefreshToken : response.refreshToken,
        expiresIn : response.expiresIn,
        userId : response.localId
      })),
      catchError(error => {
        if(error.error.error.message === 'EMAIL_EXISTS') {
          return of(new EmailAlreadyTakenError(email));
        }

        return throwError(() => error);
      })
    );
  }


  login(email:string, password:string):Observable<LoginResponse>{
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`;
    const body={email, password, "returnSecureToken":true};
    
    return this.#http.post<FirebaseResponseSignin>(url, body).pipe(
      map((response) =>({
        jwtToken : response.idToken,
        jwtRefreshToken : response.refreshToken,
        expiresIn : response.expiresIn,
        userId : response.localId,
        isRegistered : response.registered,
      })),
      catchError((error) =>{
        if(error.error.error.message === "INVALID_LOGIN_CREDENTIALS"){
          return of(new InvalidCredentialError())
        }
        return throwError(() => error)
      })
    );
  }

  refreshToken(refreshToken: string): Observable<{ jwtToken: string, userId: string }>{
    const url = `https://securetoken.googleapis.com/v1/token?key=${environment.firebaseConfig.apiKey}`;
    const body = {
      grant_type : "refresh_token",
      refresh_token : refreshToken
    }

    return this.#http.post<FirebaseResponseRefreshToken>(url, body).pipe(
      map((response) => ({
        jwtToken : response.id_token,
        userId : response.user_id,
      }))
    )
  }

}
