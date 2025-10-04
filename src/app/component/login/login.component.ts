import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @ViewChild('failedLogin') failedLogin: ElementRef | any
  @ViewChild('loginfield') loginfield: ElementRef | any

  http = inject(HttpClient);

  loginData = {
    username: '',
    password: ''
  }

  statusInfo = '';

  constructor(private router: Router) { }

  login() {
    if (this.loginData.username == '' || this.loginData.password == '') {
      this.statusInfo = 'Bitte alle Felder ausfüllen';
      this.loginfield.nativeElement.setAttribute('style', 'display:none');
      this.failedLogin.nativeElement.setAttribute('style', 'display:flex');
      setTimeout(() => {
        this.loginfield.nativeElement.setAttribute('style', 'display:flex');
        this.failedLogin.nativeElement.setAttribute('style', 'display:none');
      }, 1800);
    } else {
      this.http.post<any>('http://vorlage.paintball-evolution-crew.de/php/api/login.php', this.loginData)
        .subscribe({
          next: (response) => {
            this.statusInfo = 'Login Hat geklappt';
            this.loginfield.nativeElement.setAttribute('style', 'display:none');
            this.failedLogin.nativeElement.setAttribute('style', 'display:flex');
            setTimeout(() => {
              this.loginfield.nativeElement.setAttribute('style', 'display:flex');
              this.failedLogin.nativeElement.setAttribute('style', 'display:none');
            }, 1800);
            console.log(response)
          },
          error: (error) => {
            this.statusInfo = 'Dein Loginname oder Passwort sind Inkorrekt';
            this.loginfield.nativeElement.setAttribute('style', 'display:none');
            this.failedLogin.nativeElement.setAttribute('style', 'display:flex');
            setTimeout(() => {
              this.loginfield.nativeElement.setAttribute('style', 'display:flex');
              this.failedLogin.nativeElement.setAttribute('style', 'display:none');
            }, 1800);
            //console.error(error);
          },
          complete: () => {

          },
        });
    }
  }

  regist() {
    this.router.navigate(['/regist']);
  }

  pwforgot() {
    this.router.navigate(['/pwforgot']);
  }
}
