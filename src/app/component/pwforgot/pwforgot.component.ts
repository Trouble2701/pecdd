import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';


interface AuthResponse {
  token: string;
  firstname: string;
  lastname:string;
}
@Component({
    selector: 'app-pwforgot',
    imports: [FormsModule],
    templateUrl: './pwforgot.component.html',
    styleUrl: './pwforgot.component.scss'
})
export class PwforgotComponent {

    http = inject(HttpClient);

    mail = {
        email:''
    }
    sendInfo = ''
    userinfo = {
        email: '',
        token: '',
        firstname: '',
        lastname: '',
    }

    post = {
        endPoint: 'http://vorlage.paintball-evolution-crew.de/php/sendforgotmail.php',
        endPointToken: 'http://vorlage.paintball-evolution-crew.de/php/api/findToken.php',
    };

    @ViewChild('emailTrue') emailTrue: ElementRef | any;
    @ViewChild('emailFalse') emailFalse: ElementRef | any;
    @ViewChild('sendStatus') sendStatus: ElementRef | any

    constructor(private router: Router) { }

    sendQuestion() {
        console.log('klick')
        console.log(this.mail.email)

        if (!this.mail.email) {
            this.sendInfo = 'Bitte E-Mail Adresse eingeben';
        } else {
            this.sendInfo = 'E-Mail wurde gesendet';
            this.findToken();
        }
    }

    checkEmail() {
        var validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (this.mail.email.match(validRegex)) {
            this.emailFalse.nativeElement.setAttribute('style', 'display:none');
            this.emailTrue.nativeElement.setAttribute('style', 'display:unset');
            this.sendStatus.nativeElement.classList.remove('False');
            this.sendStatus.nativeElement.classList.add('True');
        } else {
            this.emailFalse.nativeElement.setAttribute('style', 'display:unset');
            this.emailTrue.nativeElement.setAttribute('style', 'display:none');
            this.sendStatus.nativeElement.classList.remove('True');
            this.sendStatus.nativeElement.classList.add('False');
        }
    }

    findToken() {
        this.http.post<AuthResponse>(this.post.endPointToken, this.mail)
            .subscribe({
                next: (response) => {
                this.userinfo.token = response.token;
                this.userinfo.firstname = response.firstname;
                this.userinfo.lastname = response.lastname;
                this.userinfo.email = this.mail.email;
                console.log('Token gefunden:', this.userinfo);
                this.sendMail();
                },
                error: (error) => {
                    console.error(error);
                },
                complete: () => {
                    setTimeout(() => {
                        this.router.navigate(['/start'])
                    }, 2000);
                },
            });
    }

    sendMail() {
        this.http.post(this.post.endPoint, this.userinfo)
            .subscribe({
                next: (response) => {

                },
                error: (error) => {
                    console.error(error);
                },
                complete: () => {
                    setTimeout(() => {
                        this.router.navigate(['/start'])
                    }, 2000);
                },
            });
    }
}
