import {Injectable} from '@angular/core';
import {ELEMENTS} from './mock-elements';
import {PeriodicElement} from './periodic-element';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  constructor() { }

  getElements(): Observable<PeriodicElement[]> {
    return of(ELEMENTS);
    }
}
