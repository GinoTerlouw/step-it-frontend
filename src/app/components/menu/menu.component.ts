import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeneralStateService} from '../../services/generalState/general-state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  private menuSubscriber = this.generalStateService.getToggleMenuEvent();
  private menuColorSubscriber = this.generalStateService.getAccentColorEvent();
  public isOpen: boolean = false;
  public menuColor: Colors = this.generalStateService.getAccentColor();

  constructor(private generalStateService: GeneralStateService) {
  }

  ngOnInit(): void {
    this.menuSubscriber.subscribe(() => {
      this.isOpen = !this.isOpen;
    });

    this.menuColorSubscriber.subscribe((color) => {
      this.menuColor = color;
    });
  }

  ngOnDestroy(): void {
    this.menuSubscriber.unsubscribe();
    this.menuColorSubscriber.unsubscribe();
  }
}
