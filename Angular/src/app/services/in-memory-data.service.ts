import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  // tslint:disable-next-line:typedef
  createDb() {
    const users = [
      {id: 1, admin: true, username: 'admin', name: 'admin', surname: 'admin', birth_date: '2020-04-21T00:00'},
      {id: 2, admin: false, username: 'gianni', name: 'gianni', surname: '1', birth_date: '1990-04-26T00:00'},
      {id: 3, admin: false, username: 'gagg', name: 'lorenzo', surname: 'gaggero', birth_date: '1993-03-23T00:00'},
      {id: 4, admin: false, username: 'marco', name: 'marco', surname: '2', birth_date: '2000-02-02T00:00'},
      {id: 5, admin: false, username: 'luca', name: 'luca', surname: '3', birth_date: '2020-04-21T00:00'},
      {id: 6, admin: false, username: 'federica', name: 'federica', surname: '4', birth_date: '2020-04-21T00:00'},
      {id: 7, admin: false, username: 'elisa', name: 'elisa', surname: '5', birth_date: '2020-04-21T00:00'},
      {id: 8, admin: false, username: 'daria', name: 'daria', surname: '6', birth_date: '2020-04-21T00:00'},
      {id: 9, admin: false, username: 'ivano', name: 'ivano', surname: '7', birth_date: '2020-04-21T00:00'},
      {id: 10, admin: false, username: 'antonella', name: 'antonella', surname: '8', birth_date: '2020-04-21T00:00'},
    ];
    const vehicles = [
      {id: 1, casa_costruttrice: 'honda', modello: 'civic', anno_di_immatricolazione: 2015, targa: 'da907ve'},
      {id: 2, casa_costruttrice: 'citroen', modello: 'c3', anno_di_immatricolazione: 2008, targa: 'fa817ge'},
      {id: 3, casa_costruttrice: 'ferrari', modello: 'modena', anno_di_immatricolazione: 2021, targa: 'gg999gg'}
    ];
    return {users, vehicles};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
}
