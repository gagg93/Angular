import { Component, OnInit } from '@angular/core';
import {MyHeaders} from '../../my-configs/my-headers';
import {MyOrder} from '../../my-configs/my-order';
import {MySearch} from '../../my-configs/my-search';
import {MyPagination} from '../../my-configs/my-pagination';
import {MyTableConfig} from '../../my-configs/my-table-config';
import {MyTableActionEnum} from '../../my-configs/my-table-action-enum';
import {MyWrapper} from '../../my-wrapper';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReservationService} from '../../services/reservation.service';
import {Reservation} from '../../models/reservation';

const headerconfig: MyHeaders[] = [
  {key: 'username' , label: 'Username'},
  {key: 'name' , label: 'Nome'},
  {key: 'surname' , label: 'Cognome'},
  {key: 'birth_date' , label: 'Data di nascita'}];

const orderConfig: MyOrder = {
  defaultColumn: 'id',
  orderType: 'ascending'
};

const search: MySearch = {
  colums: ['username', 'name' , 'surname' , 'birth_date']
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
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title: string;
  test: MyWrapper;
  dataSource: User[] ;
  myTableConfig = tableconfig;
  reservations: Reservation[];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,
              private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(x => this.dataSource = x);
    this.reservationService.getReservations().subscribe(res => this.reservations = res);
  }

  newRoute(event: MyWrapper): void {
    let url;
    if (event.command === 'edit') {
      url = './' + event.command + '/user/' + event.object.id;
    }
    if (event.command === 'new') {
      url = './' + event.command + '/user';
    }
    if (event.command === 'delete') {
      if (confirm('Are you sure to delete ' + event.object.id)) {
        if (this.reservations.find(x => x.user_id === event.object.id)) {
          url = '/users';
          console.log(event.object.id);
          this.userService.deleteUser(event.object.id).subscribe();
          this.getUsers();
        }else {alert('prenotazione a carico'); }
      }else{return; }
    }
    console.log(url);
    this.router.navigate([url], {relativeTo: this.route});
  }
}
