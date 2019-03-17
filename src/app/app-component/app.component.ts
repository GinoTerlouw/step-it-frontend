import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuVisible: boolean = false;
  backGroundColor: string = 'purple';
  accentColor: string = 'orange';
}
