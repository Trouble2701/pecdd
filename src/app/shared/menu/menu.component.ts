import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    imports: [],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})
export class MenuComponent {

  constructor(private router:Router){}

  home(){
    this.router.navigate(['/news']);
  }

  calender(){
    this.router.navigate(['/calender']);
  }

  galery(){
    this.router.navigate(['/galery']);
  }

  sale(){
    this.router.navigate(['/sale']);
  }

  news(){
    this.router.navigate(['/news']);
  }

  shops(){
    this.router.navigate(['/shops']);
  }

  events(){
    this.router.navigate(['/events']);
  }

  locations(){
    this.router.navigate(['/locations']);
  }
}
