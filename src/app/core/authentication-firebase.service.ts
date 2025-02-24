import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { AuthenticationService, LoginResponse, RegisterResponse } from './authentication.service';

/**
 * Represents the payload of the response received when registering a new user in firebase.
 *  
 * @see https://firebase.google.com/docs/reference/rest/auth?hl=fr#section-create-email-password
 */

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

@Injectable()
export class AuthenticationFirebaseService implements AuthenticationService{

  readonly #http = inject(HttpClient);

  register(email:string, password:string):Observable<RegisterResponse>{
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`;
    const body={email, password, "returnSecureToken":true};
    
    return this.#http.post<FirebaseResponseSignup>(url, body).pipe(
      map((response) => ({
        jwtToken : response.idToken,
        jwtRefreshToken : response.refreshToken,
        expiresIn : response.expiresIn,
        userId : response.localId
      }))
    );
  }


  login(email:string, password:string):Observable<LoginResponse>{
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`;
    const body={email, password, "returnSecureToken":true};
    
    return this.#http.post<FirebaseResponseSignin>(url, body).pipe(
      map((response) =>({
        jwtToken : response.idToken,
        jwtRefreshToken : response.refreshToken,
        expiresIn : response.expiresIn,
        userId : response.localId,
        isRegistered : response.registered,
      }))
    );
  }

  // save(email:string, userId:string, bearerToken:string):Observable<unknown>{
  //   const baseurl = `https://firestore.googleapis.com/v1/projects/${environment.firebase.projectId}/databases/(default)/documents`;
  //   const userFirestoreCollectionId = "users";
  //   const url = `${baseurl}/${userFirestoreCollectionId}?key=${environment.firebase.apiKey}&documentId=${userId}`;
  //   const body = {
  //     fields : {
  //       id : {stringValue: userId},
  //       email : {stringValue: email}
  //     }
  //   };

  //   const headers = new HttpHeaders({
  //     Authorization : `Bearer ${bearerToken}`
  //   });
  //   const options = {headers};

  //   return this.#http.post<unknown>(url, body, options);
  // }
}
