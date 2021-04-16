import {Component, OnInit} from '@angular/core';
import {PeriodicElement} from './periodic-element';
import {MyHeaders} from './my-headers';
import {MyTableConfig} from './my-table-config';
import {MyOrder} from './my-order';
import {MySearch} from './my-search';
import {MyPagination} from './my-pagination';
import {MyTableActionEnum} from './my-table-action-enum';
import {ElementsService} from './elements.service';
import {MyWrapper} from './my-wrapper';


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
export class AppComponent implements OnInit{
  title: string;
  private element: PeriodicElement = {position: 1, name: 'ciao', symbol: 'k', weight: 54};
  test: MyWrapper = {object: this.element, command: 'ciao'};
  dataSource: PeriodicElement[] = [];
  myTableConfig = tableconfig;

  constructor(private elementsService: ElementsService) {
  }

  ngOnInit(): void {
    this.getElements();
  }

  getElements(): void {
    this.elementsService.getElements().subscribe(elements => this.dataSource = elements);
  }

  newRoute($event: MyWrapper): void {
    this.test = $event;
  }
}
