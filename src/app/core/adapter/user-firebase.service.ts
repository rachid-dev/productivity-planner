import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserService } from '../port/user.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../entity/user.interface';

interface UserFirebasePayload {
  fields: {
    name: { stringValue: string };
    email: { stringValue: string };
  };
}

@Injectable()
export class UserFirebaseService implements UserService {
  readonly #http = inject(HttpClient);

  readonly #FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents`;
  readonly #USER_COLLECTION_ID = 'users';
  readonly #FIREBASE_API_KEY = environment.firebaseConfig.apiKey;
  readonly #USER_COLLECTION_URL = `${this.#FIRESTORE_URL}/${this.#USER_COLLECTION_ID}?key=${this.#FIREBASE_API_KEY}&documentId=`;

  create(user: User, bearerToken: string): Observable<void> {
    const url = `${this.#USER_COLLECTION_URL}${user.id}`;
    const body = {
      fields: {
        name: { stringValue: user.name },
        email: { stringValue: user.email },
      },
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${bearerToken}`,
    });
    const options = { headers };

    return this.#http.post(url, body, options).pipe(map(() => undefined));
  }

  fetch(userId: string, bearerToken: string): Observable<User> {
    const url = `${this.#FIRESTORE_URL}/${this.#USER_COLLECTION_ID}/${userId}?key=${this.#FIREBASE_API_KEY}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${bearerToken}`,
    });
    const options = { headers };

    return this.#http.get<UserFirebasePayload>(url, options).pipe(
      map((response) => ({
        id: userId,
        name: response.fields.name.stringValue,
        email: response.fields.email.stringValue,
      })),
    );
  }
}
