import {Component, Input, OnInit} from '@angular/core';
import {MyTableConfig} from '../my-table-config';
import {MyButtonConfig} from '../my-button-config';
import { Output, EventEmitter } from '@angular/core';
import {MyWrapper} from '../my-wrapper';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() displayedColumns: MyTableConfig;
  @Input() dataSource: any[];
  @Output() newRouteEvent = new EventEmitter<MyWrapper>();
  filteredList: any[];
  lastSortedByField;
  ascendingOrder = true;
  currentPage = 0;
  button1: MyButtonConfig =
    {customCssClass: 'accent', text: 'save', icon: 'done'
    };
  button2: MyButtonConfig =
    {customCssClass: 'warn', text: 'delete', icon: 'delete'
    };
  button3: MyButtonConfig =
    {customCssClass: 'primary', text: 'new', icon: 'add'
    };
  myWrapper: MyWrapper = {object: null, command: 'ciao'};

  setMyWrapper(object: any, command: string): MyWrapper{
    this.myWrapper.object = object;
    this.myWrapper.command = command;
    return this.myWrapper;
  }

  order(): void {}

  constructor() { }

  ngOnInit(): void {
    this.filteredList = this.dataSource;
    this.ascendingOrder = this.displayedColumns.order.orderType !== 'ascending';
    this.lastSortedByField = this.displayedColumns.order.defaultColumn;
    this.onHeaderClick(this.displayedColumns.order.defaultColumn);
  }

  onHeaderClick(header: string): void{
    if (header === 'actions'){
      return;
    }
    if (this.lastSortedByField === header) {
      this.ascendingOrder = !this.ascendingOrder;
    }
    else {
      this.lastSortedByField = header;
      this.ascendingOrder = true;
    }

    if (this.ascendingOrder) {

      this.filteredList = this.filteredList.sort((a, b) => {
        if (a[header] < b[header]) {
          return -1;
        }
        if (a[header] > b[header]) {
          return 1;
        }
        return 0;
      });
    } else {
      this.filteredList = this.filteredList.sort((a, b) => {
        if (a[header] < b[header]) {
          return 1;
        }
        if (a[header] > b[header]) {
          return -1;
        }
        return 0;
      });
  }
    this.onSelectPage((this.currentPage + 1).toString());
  }

  onSearchClick(search: string, field: string): any{
    if (search.trim()) {
      this.filteredList = [];
      this.dataSource.forEach(element =>
      {if (element[field].toString().toLowerCase().indexOf(search.toLowerCase()) > -1)
            {this.filteredList.push(element);
          }});
    }else {
      this.filteredList = this.dataSource;
    }
    this.onSelectPage('1');
  }

  onSelectPage(value: string): void{
    if ((Number(value) - 1) > this.filteredList.length / this.displayedColumns.pagination.itemsPerPage - 1) {
      this.currentPage = this.filteredList.length / this.displayedColumns.pagination.itemsPerPage - 1;
    }else{
      this.currentPage = (Number(value) - 1);
    }
    }


  onPageNumberSelect(value: string): void{
    this.displayedColumns.pagination.itemsPerPage = +value;
    this.onSelectPage('1');
  }

  route(url: any): void {
    this.newRouteEvent.emit(url);
  }
}

