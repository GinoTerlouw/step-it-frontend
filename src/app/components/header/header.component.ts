import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuStateService} from '../../services/menuState/menu-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private menuStateService: MenuStateService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
