import { Component } from '@angular/core';
import { LoginComponent } from '../../component/login/login.component';
import { GamedaycounterComponent } from '../gamedaycounter/gamedaycounter.component';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent, GamedaycounterComponent, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
}
