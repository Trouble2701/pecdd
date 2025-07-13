import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginData = {
    loginname: '',
    password: ''
  }

  constructor(private router: Router){}

  login(){
    if(this.loginData.loginname == '' || this.loginData.password == ''){
      alert('Nicht alles ausgefüllt');
    }else{
      alert('Login wurde Angeklickt, Name: '+ this.loginData.loginname + ' und Passwort: ' + this.loginData.password);
    }
  }

  regist(){
    this.router.navigate(['/regist']);
  }

  pwforgot(){
    this.router.navigate(['/pwforgot']);
  }
}
