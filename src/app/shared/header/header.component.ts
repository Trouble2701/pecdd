import { Component} from '@angular/core';
import { LoginComponent } from '../../component/login/login.component';
import { GamedaycounterComponent } from '../gamedaycounter/gamedaycounter.component';
import { MenuComponent } from '../menu/menu.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
    selector: 'app-header',
    imports: [LoginComponent, GamedaycounterComponent, MenuComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent{

    constructor(private router: Router, private http: HttpClient){ }
}
