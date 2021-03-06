import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, UrlSegment} from '@angular/router';
import {VehicleService} from '../../services/vehicle.service';
import {UserService} from '../../services/user.service';
import { Location } from '@angular/common';
import {MyButtonConfig} from '../../my-configs/my-button-config';
import * as moment from 'moment';
import {ReservationService} from '../../services/reservation.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  urlSegments: UrlSegment[];
  object: any;
  service: any;
  button1: MyButtonConfig =
    {customCssClass: 'accent', text: 'edit', icon: 'done'
    };
  button2: MyButtonConfig =
    {customCssClass: 'white', text: 'back', icon: 'undo'
    };
  button3: MyButtonConfig =
    {customCssClass: 'accent', text: 'create', icon: 'done'
    };
  private reservations;
  private users;
  private vehicles;


constructor(private activatedRoute: ActivatedRoute, private vehicleService: VehicleService, private reservationService: ReservationService,
            private userService: UserService, private location: Location) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(res => this.reservations = res);
    this.userService.getUsers().subscribe(users => this.users = users);
    this.vehicleService.getVehicles().subscribe(vehicles => this.vehicles = vehicles);
    this.activatedRoute.url.subscribe(params => this.urlSegments = params);
    switch (this.urlSegments[1].toString()){
      case 'vehicle': this.service = this.vehicleService;
                      this.object = {id: null, casa_costruttrice: '', modello: '', anno_di_immatricolazione: '', targa: null}; break;
      case 'user': this.service = this.userService; this.object = {
        id: null, admin: false, password: '', username: '', name: '', surname: '', birth_date: '2021-04-09T11:18'};
                   break;
      case 'reservation': this.service = this.reservationService;
                          this.object = {id: null, user_id: null, vehicle_id: null , res_begin: moment().add(2, 'days')
                              .format('yyyy-MM-DDTHH:mm'), res_end: moment().add(2, 'days').add(1, 'hour')
                              .format('yyyy-MM-DDTHH:mm')};
                          break;
    }
    if (this.urlSegments[0].toString() === 'edit'){
      this.service.getById(+this.urlSegments[2].path.toString()).subscribe(params => this.object = params);
      Object.keys(this.object).forEach(key => {if (this.isDate(this.object)) {
        this.object[key] = moment(this.object[key]).format('yyyy-MM-DDThh:mm');
      }});
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
  let flag = true;
  const fields: string[] = [];
  Object.keys(this.object).forEach(key => {if (key !== 'id' && (
    this.object[key] === null || this.object[key].toString().trim() === '') ) { flag = false; fields.push(key); }});
  if (!flag) {
    alert ('field missing ' + fields.toString());
    return;
  }
  if (this.urlSegments[1].toString() === 'reservation') {
    flag = false;
    console.log(this.users.length);
    this.users.forEach(user => {if (user.id.toString() === this.object.user_id.toString()) {flag = true; }});
    if (!flag) {
      alert('user not existing');
      return;
    }
    flag = false;
    this.vehicles.forEach(vehicle => {if (vehicle.id.toString() === this.object.vehicle_id.toString()) {flag = true; }});
    if (!flag) {
      alert('vehicle not existing');
      return;
    }
    const s = this.service.validate(this.object, this.reservations);
    if (s !== '') {
      alert (s);
      return;
    }
  }
  if (this.object.id !== null) {
    this.service.update(this.object)
      .subscribe(() => this.goBack());
  }else{
    this.service.addObj(this.object)
      .subscribe(() => this.goBack());  }
  }

  isDate(field: any): boolean{
  return Date.parse(field) && isNaN(field);
  }
}
