import { Component, OnInit } from '@angular/core';
import {MyHeaders} from '../../my-configs/my-headers';
import {MyOrder} from '../../my-configs/my-order';
import {MySearch} from '../../my-configs/my-search';
import {MyPagination} from '../../my-configs/my-pagination';
import {MyTableConfig} from '../../my-configs/my-table-config';
import {MyTableActionEnum} from '../../my-configs/my-table-action-enum';
import {MyWrapper} from '../../my-wrapper';
import {Observable} from 'rxjs';
import {ReservationService} from '../../services/reservation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Reservation} from '../../models/reservation';


const headerconfig: MyHeaders[] = [
  {key: 'user_id' , label: 'User'},
  {key: 'vehicle_id' , label: 'Vehicle'},
  {key: 'res_begin' , label: 'Data di inizio'},
  {key: 'res_end' , label: 'Data di fine'}];

const orderConfig: MyOrder = {
  defaultColumn: 'id',
  orderType: 'ascending'
};

const search: MySearch = {
  colums: ['user_id', 'vehicle_id' , 'res_begin' , 'res_end']
};

const pagination: MyPagination =
  {
    itemsPerPage: 10, itemsPerPageOptions: [2, 5, 10, 20]
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
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  title: string;
  test: MyWrapper;
  dataSource: Observable<Reservation[]> ;
  myTableConfig = tableconfig;

  constructor(private reservationService: ReservationService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.dataSource = this.reservationService.getReservations();
  }

  newRoute(event: MyWrapper): void {
    let url;
    if (event.command === 'edit') {
      url = './' + event.command + '/reservation/' + event.object.id;
    }
    if (event.command === 'new') {
      url = './' + event.command + '/reservation';
    }
    if (event.command === 'delete') {
      if (confirm('Are you sure to delete ' + event.object.id)) {
        url = '/reservations';
        console.log(event.object.id);
        this.reservationService.deleteReservation(event.object.id).subscribe();
        this.getReservations();
      }else{return; }
    }
    console.log(url);
    this.router.navigate([url], {relativeTo: this.route});
  }
}
