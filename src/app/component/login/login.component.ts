import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginData = {
    loginname: '',
    password: ''
  }

  login(){
    if(this.loginData.loginname == '' || this.loginData.password == ''){
      alert('Nicht alles ausgefüllt');
    }else{
      alert('Login wurde Angeklickt, Name: '+ this.loginData.loginname + ' und Passwort: ' + this.loginData.password);
    }
  }
}
