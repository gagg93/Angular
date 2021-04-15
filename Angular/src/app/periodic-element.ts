import {MyButtonConfig} from './my-button-config';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  buttons: MyButtonConfig[];
}
