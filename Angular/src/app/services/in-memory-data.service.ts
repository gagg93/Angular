import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {User} from '../models/user';
import {of, throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  // tslint:disable-next-line:typedef
  createDb() {
    const users = [
      {id: 1, admin: true, username: 'admin', password: 'test', name: 'admin', surname: 'admin', birth_date: '2020-04-21T00:00'},
      {id: 2, admin: false, username: 'gianni', password: 'test', name: 'gianni', surname: '1', birth_date: '1990-04-26T00:00'},
      {id: 3, admin: false, username: 'gagg', password: 'test', name: 'lorenzo', surname: 'gaggero', birth_date: '1993-03-23T00:00'},
      {id: 4, admin: false, username: 'marco', password: 'test', name: 'marco', surname: '2', birth_date: '2000-02-02T00:00'},
      {id: 5, admin: false, username: 'luca', password: 'test', name: 'luca', surname: '3', birth_date: '2020-04-21T00:00'},
      {id: 6, admin: false, username: 'federica', password: 'test', name: 'federica', surname: '4', birth_date: '2020-04-21T00:00'},
      {id: 7, admin: false, username: 'elisa', password: 'test', name: 'elisa', surname: '5', birth_date: '2020-04-21T00:00'},
      {id: 8, admin: false, username: 'daria', password: 'test', name: 'daria', surname: '6', birth_date: '2020-04-21T00:00'},
      {id: 9, admin: false, username: 'ivano', password: 'test', name: 'ivano', surname: '7', birth_date: '2020-04-21T00:00'},
      {id: 10, admin: false, username: 'antonella', password: 'test', name: 'antonella', surname: '8', birth_date: '2020-04-21T00:00'},
    ];
    const vehicles = [
      {id: 1, casa_costruttrice: 'honda', modello: 'civic', anno_di_immatricolazione: 2015, targa: 'da907ve'},
      {id: 2, casa_costruttrice: 'citroen', modello: 'c3', anno_di_immatricolazione: 2008, targa: 'fa817ge'},
      {id: 3, casa_costruttrice: 'ferrari', modello: 'modena', anno_di_immatricolazione: 2021, targa: 'gg999gg'}
    ];
    const reservations = [
      {id: 1, vehicle_id: '3', user_id: '3', res_begin: '2021-04-27T12:00', res_end: '2021-04-29T14:00'},
      {id: 2, vehicle_id: '2', user_id: '4', res_begin: '2021-05-22T12:00', res_end: '2021-05-22T14:00'},
      {id: 3, vehicle_id: '1', user_id: '2', res_begin: '2021-05-23T12:00', res_end: '2021-05-23T14:00'},
      {id: 4, vehicle_id: '2', user_id: '3', res_begin: '2021-05-26T12:00', res_end: '2021-05-30T14:00'},
    ];
    return {users, vehicles, reservations};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }

  authenticate(body: any): any {
    const { username, password } = body;
    const user = this.createDb().users.find(x => x.username === username && x.password === password);
    if (!user) {return this.error('Username or password is incorrect'); }
    return this.ok({
      id: user.id,
      username: user.username,
      name: user.name,
      surname: user.surname,
      birth_date: user.birth_date,
      admin: user.admin,
      token: 'fake-jwt-token'
    });
  }

  // tslint:disable-next-line:typedef
  ok(body?) {
    return of(new HttpResponse({ status: 200, body }));
  }

  // tslint:disable-next-line:typedef
  error(message) {
    return throwError({ error: { message } });
  }

}
