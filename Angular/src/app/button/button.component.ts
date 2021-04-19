import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MyButtonConfig} from '../my-button-config';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() buttonConfig: MyButtonConfig;
  @Output() newButtonEvent = new EventEmitter<string>();


  constructor() {}

  ngOnInit(): void {}

  onBtnClick(url: string): void{
    this.newButtonEvent.emit(url);
  }

}
