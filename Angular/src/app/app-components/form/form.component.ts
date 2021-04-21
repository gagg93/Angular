import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, UrlSegment} from '@angular/router';
import {VehicleService} from '../../services/vehicle.service';
import {UserService} from '../../services/user.service';
import { Location } from '@angular/common';
import {MyButtonConfig} from '../../my-configs/my-button-config';
import * as moment from 'moment';



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


constructor(private activatedRoute: ActivatedRoute, private vehicleService: VehicleService,
            private userService: UserService, private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(params => this.urlSegments = params);
    switch (this.urlSegments[1].toString()){
      case 'vehicle': this.service = this.vehicleService;
                      this.object = {id: null, casa_costruttrice: '', modello: '', anno_di_immatricolazione: '', targa: null}; break;
      case 'user': this.service = this.userService;
                   this.object = {id: null, admin: false, username: '', name: '', surname: '', birth_date: '2021-04-09T11:18'}; break;
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
