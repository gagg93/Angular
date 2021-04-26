import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class User{
  constructor(
    public status: string,
  ) {}

}

export class JwtResponse{
  constructor(
    public jwttoken: string,
  ) {}

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  // tslint:disable-next-line:typedef
  authenticate(username, password) {
    return this.httpClient.post<any>('http://localhost:8080/authenticate', {username, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          const tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        }
      )

    );
  }


  // tslint:disable-next-line:typedef
  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    // console.log(!(user === null))
    return !(user === null);
  }

  // tslint:disable-next-line:typedef
  logOut() {
    sessionStorage.removeItem('username');
  }
}
