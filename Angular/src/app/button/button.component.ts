import { Component, OnInit, Input } from '@angular/core';
import {MyButtonConfig} from '../my-button-config';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() buttonConfig: MyButtonConfig;

  constructor() {}

  ngOnInit(): void {}

  onBtnClick(): void{

  }

}
