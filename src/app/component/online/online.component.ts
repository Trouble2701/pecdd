import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-online',
  imports: [],
  templateUrl: './online.component.html',
  styleUrl: './online.component.scss'
})
export class OnlineComponent {


  firstname = 'Sven'
  new_pn = ''

  constructor(private router:Router){
    this.showNewPn()
  }

   profil(){
    this.router.navigate(['/profil']);
  }

  pncenter(){
    this.router.navigate(['/pncenter']);
  }

  admin(){
    this.router.navigate(['/adminbereich']);
  }

  logout(){
    this.router.navigate(['/loggedout']);
  }

  showNewPn(){
    this.new_pn = '(1)'
  }
}
