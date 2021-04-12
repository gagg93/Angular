import { Component } from '@angular/core';
import {PrimaryButton} from './PrimaryButton';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myButtonConfig = PrimaryButton;

}
