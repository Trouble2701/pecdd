import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regist',
  standalone: true,
  imports: [],
  templateUrl: './regist.component.html',
  styleUrl: './regist.component.scss'
})
export class RegistComponent {

  constructor(private router: Router){}

  sendCode(){
    this.router.navigate(['/registcode']);
  }
}
