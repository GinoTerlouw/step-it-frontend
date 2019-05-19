import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {GeneralStateService} from '../../services/generalState/general-state.service';
import {LocalstorageService} from '../../services/localstorage/localstorage.service';
import {JwtService} from '../../services/jwt/jwt.service';

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
  public scale: string;

  constructor(
    private generalStateService: GeneralStateService,
    private jwtService: JwtService
  ) {
    this.setScale(window.innerWidth / 160 + 10);
  }

  ngOnInit(): void {
    this.menuSubscriber.subscribe(() => {
      this.isOpen = !this.isOpen;
    });

    this.menuColorSubscriber.subscribe((color) => {
      this.menuColor = color;
    });
  }

  logout(): void {
    this.jwtService.logout();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setScale(event.target.innerWidth / 160 + 30);
  }

  setScale(scale: number) {
    this.scale = `scale(${scale})`;
  }

  ngOnDestroy(): void {
    this.menuSubscriber.unsubscribe();
    this.menuColorSubscriber.unsubscribe();
  }
}
