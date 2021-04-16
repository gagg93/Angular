import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { PeriodicElement} from './periodic-element';
import {ELEMENTS} from './mock-elements';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  // @ts-ignore
  // tslint:disable-next-line:typedef
  createDb() {
  }

  getElements(): PeriodicElement[] {
    return ELEMENTS;
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(elements: PeriodicElement[]): number {
    return elements.length > 0 ? Math.max(...elements.map(periodicelement => periodicelement.position)) + 1 : 11;
  }
}
