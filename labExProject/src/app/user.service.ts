import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

export interface User {
  carnet: number,
  nombre: string,
  beca: string,
  precio: number,
}

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>('http://localhost:3000/users/' + id)
  }

  insertUser(user: User) {
    this.http.post<User>('http://localhost:3000/users/', user).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

  updateUser(user: User) {
    this.http.put<void>('http://localhost:3000/users/' + user.carnet, user).subscribe(
      val => {
        console.log("PUT call successful value returned in body",
          val);
      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The PUT observable is now completed.");
      }
    );
  }

  deleteUser(id: number) {
    this.http.delete('http://localhost:3000/users/' + id).subscribe(
      (val) => {
        console.log("DELETE call successful value returned in body",
          val);
      },
      response => {
        console.log("DELETE call in error", response);
      },
      () => {
        console.log("The DELETE observable is now completed.");
      });
  }
}

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor() { }
// }
