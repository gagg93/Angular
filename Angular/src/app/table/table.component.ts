import {Component, Input, OnInit} from '@angular/core';
import {MyTableConfig} from '../my-table-config';
import {MyButtonConfig} from '../my-button-config';
import { Output, EventEmitter } from '@angular/core';




@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() displayedColumns: MyTableConfig;
  @Input() dataSource: any[];
  @Input() idrow = 'id';
  @Output() newRouteEvent = new EventEmitter<string>();
  filteredList: any[];
  pagedList: any[];
  lastSortedByField;
  ascendingOrder = true;
  i: number;
  number: number;
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

  order(): void {}

  constructor() { }

  ngOnInit(): void {
    this.filteredList = this.dataSource;
    this.ascendingOrder = this.displayedColumns.order.orderType !== 'ascending';
    this.lastSortedByField = this.displayedColumns.order.defaultColumn;
    this.onHeaderClick(this.displayedColumns.order.defaultColumn);
    this.pagedList = [];
    for (let i = 0; i < this.displayedColumns.pagination.itemsPerPage; i++){
      this.pagedList.push(this.filteredList[i]);
    }
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
    this.pagedList = [];
    for (let i = 0; i < this.displayedColumns.pagination.itemsPerPage; i++){
      const z: number = this.currentPage * this.displayedColumns.pagination.itemsPerPage + i;
      if (z < this.filteredList.length) {
        this.pagedList.push(this.filteredList[z]);
      }
    }
   }

  onPageNumberSelect(value: string): void{
    this.displayedColumns.pagination.itemsPerPage = +value;
    this.onSelectPage('1');
  }

  route(url: string): void {
    this.newRouteEvent.emit(url);
  }
}

