import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent implements OnInit {
  private hamburger: boolean = true;
  public color: string = 'orange';

  @Output menu: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  toggleState() {
    document.getElementById('hamburger').classList.toggle('bt-menu-open');
    this.hamburger = !this.hamburger;
  }

  ngOnInit() {
  }

}
