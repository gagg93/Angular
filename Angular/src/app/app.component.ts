import {Component} from '@angular/core';
import {PrimaryButton} from './PrimaryButton';
import {PeriodicElement} from './periodic-element';
import {MyHeaders} from './my-headers';
import {MyTableConfig} from './my-table-config';
import {MyButtonConfig} from './my-button-config';
import {MyOrder} from './my-order';
import {MySearch} from './my-search';
import {MyPagination} from './my-pagination';
import {MyTableActionEnum} from './my-table-action-enum';


const buttons: MyButtonConfig[] = [
  {customCssClass: 'accent', text: 'save', icon: 'done'},
  {customCssClass: 'warn', text: 'delete', icon: 'delete'}
];


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', buttons},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', buttons},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', buttons},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', buttons},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', buttons},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', buttons},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', buttons},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', buttons},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', buttons},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', buttons},
];

const headerconfig: MyHeaders[] = [
  {key: 'position' , label: 'posizione'},
  {key: 'name' , label: 'nome'},
  {key: 'weight' , label: 'peso'},
  {key: 'symbol' , label: 'simbolo'}];

const orderConfig: MyOrder = {
  defaultColumn: 'position',
  orderType: 'ascending'
};

const search: MySearch = {
  colums: ['name', 'weight' , 'symbol']
};

const pagination: MyPagination =
{
  itemsPerPage: 2, itemsPerPageOptions: [2, 5, 10, 20]
};



const tableconfig: MyTableConfig = {
  headers: headerconfig,
  order: orderConfig,
  search,
  pagination,
  actions: [MyTableActionEnum.NEW_ROW,
   MyTableActionEnum.DELETE, MyTableActionEnum.EDIT]
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myButtonConfig = PrimaryButton;
  title: string;
  dataSource = ELEMENT_DATA;
  myTableConfig = tableconfig;

  newRoute($event: string): void {
    this.title = $event;
  }
}
