import { Component } from '@angular/core';
import { LoginComponent } from '../../component/login/login.component';
import { GamedaycounterComponent } from '../gamedaycounter/gamedaycounter.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent, GamedaycounterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
}
