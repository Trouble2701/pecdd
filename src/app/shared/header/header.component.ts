import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../component/login/login.component';
import { OnlineComponent } from '../../component/online/online.component';
import { GamedaycounterComponent } from '../gamedaycounter/gamedaycounter.component';
import { MenuComponent } from '../menu/menu.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
    selector: 'app-header',
    imports: [CommonModule, LoginComponent, GamedaycounterComponent, MenuComponent, OnlineComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent{

    logged = false

    constructor(private router: Router, private http: HttpClient){}

    ngOnInit(){
        this.setLoggedIn(false);
    }

    setLoggedIn(status: boolean) {
        this.logged = status;
    }
}
