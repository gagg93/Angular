import { Component, OnInit } from '@angular/core';
import {MyHeaders} from '../../my-configs/my-headers';
import {MyOrder} from '../../my-configs/my-order';
import {MySearch} from '../../my-configs/my-search';
import {MyPagination} from '../../my-configs/my-pagination';
import {MyTableConfig} from '../../my-configs/my-table-config';
import {MyTableActionEnum} from '../../my-configs/my-table-action-enum';
import {MyWrapper} from '../../my-wrapper';
import {Observable} from 'rxjs';
import {VehicleService} from '../../services/vehicle.service';
import {Vehicle} from '../../models/vehicle';
import {ActivatedRoute, Router} from '@angular/router';

const headerconfig: MyHeaders[] = [
  {key: 'casa_costruttrice' , label: 'Casa costruttrice'},
  {key: 'modello' , label: 'Modello'},
  {key: 'anno_di_immatricolazione' , label: 'Anno di immatricolazione'},
  {key: 'targa' , label: 'Targa'}];

const orderConfig: MyOrder = {
  defaultColumn: 'id',
  orderType: 'ascending'
};

const search: MySearch = {
  colums: ['casa_costruttrice', 'modello' , 'anno_di_immatricolazione' , 'targa']
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
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  title: string;
  test: MyWrapper;
  dataSource: Observable<Vehicle[]> ;
  myTableConfig = tableconfig;

  constructor(private vehicleService: VehicleService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.dataSource = this.vehicleService.getVehicles();
  }

  newRoute(event: MyWrapper): void {
    let url;
    if (event.command === 'edit') {
       url = './' + event.command + '/vehicle/' + event.object.id;
    }
    if (event.command === 'new') {
      url = './' + event.command + '/vehicle';
    }
    if (event.command === 'delete') {
      if (confirm('Are you sure to delete ' + event.object.id)) {
        url = '/vehicles';
        console.log(event.object.id);
        this.vehicleService.deleteVehicle(event.object.id).subscribe();
        this.getVehicles();
      }else{return; }
    }
    console.log(url);
    this.router.navigate([url], {relativeTo: this.route});
  }
}
