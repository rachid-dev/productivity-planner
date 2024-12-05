import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';

/**
 * Represents the payload of the response received when registering a new user in firebase.
 *  
 * @see https://firebase.google.com/docs/reference/rest/auth?hl=fr#section-create-email-password
 */

interface FirebaseRegisterResponse{ 
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly #http = inject(HttpClient);

  register(email:string, password:string):Observable<FirebaseRegisterResponse>{
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`;
    const body={email, password, "returnSecureToken":true};
    
    return this.#http.post<FirebaseRegisterResponse>(url, body);
  }
}
