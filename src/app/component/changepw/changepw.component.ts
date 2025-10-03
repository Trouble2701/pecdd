import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-changepw',
  imports: [FormsModule],
  templateUrl: './changepw.component.html',
  styleUrl: './changepw.component.scss'
})
export class ChangepwComponent implements OnInit {

  @ViewChild('passTrue') passTrue: ElementRef | any
  @ViewChild('passFalse') passFalse: ElementRef | any
  @ViewChild('passSecondFalse') passSecondFalse: ElementRef | any
  @ViewChild('passSecondTrue') passSecondTrue: ElementRef | any
  @ViewChild('sendStatus') sendStatus: ElementRef | any


  newPassword = {
    passwordOne: '',
    passwordTwo: '',
    passwordCheck: false,
    token: '',
  }

  sendInfo = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.newPassword.token = this.route.snapshot.paramMap.get('token') as string;
  }

  checkFirstPassword() {
    if (this.checkValidation()) {
      this.passTrue.nativeElement.setAttribute('style', 'display:unset');
      this.passFalse.nativeElement.setAttribute('style', 'display:none');
    } else {
      this.passTrue.nativeElement.setAttribute('style', 'display:none');
      this.passFalse.nativeElement.setAttribute('style', 'display:unset');
    }
  }

  checkSecondPassword() {
    if (this.checkValidation()) {
      this.passTrue.nativeElement.setAttribute('style', 'display:unset');
      this.passFalse.nativeElement.setAttribute('style', 'display:none');
      this.checkGleichheit();
    } else {
      this.passTrue.nativeElement.setAttribute('style', 'display:none');
      this.passFalse.nativeElement.setAttribute('style', 'display:unset');
    }
  }

  checkValidation() {
    return /[A-Z]/.test(this.newPassword.passwordOne) &&
      /[a-z]/.test(this.newPassword.passwordOne) &&
      /[0-9]/.test(this.newPassword.passwordOne) &&
      /[^A-Za-z0-9]/.test(this.newPassword.passwordOne) &&
      this.newPassword.passwordOne.length > 7;
  }

  checkGleichheit(): any {
    this.newPassword.passwordOne == this.newPassword.passwordTwo ? this.passCheck(true, 'none', 'unset') : this.passCheck(false, 'unset', 'none')
  }


  passCheck(check: boolean, disFalse: string, disTrue: string) {
    this.newPassword.passwordCheck = check
    this.passSecondFalse.nativeElement.setAttribute('style', 'display:' + disFalse);
    this.passSecondTrue.nativeElement.setAttribute('style', 'display:' + disTrue);
  }

  saveNewPw() {
    this.newPassword.passwordOne == this.newPassword.passwordTwo ? this.saveChange() : this.errorChange();
  }

  saveChange() {
    const saveNewPw = {
      password: this.newPassword.passwordOne,
      token: this.newPassword.token
    }
    this.http.post<any>('http://vorlage.paintball-evolution-crew.de/php/api/changepw.php', saveNewPw).subscribe({
      next: (response) => {
        if (response.success) {
          this.sendStatus.nativeElement.classList.remove('False');
          this.sendStatus.nativeElement.classList.add('True');
          this.sendInfo = 'Dein Passwort wurde geändert';
          setTimeout(() => {
            this.router.navigate(['/start'])
          }, 2000);
        } else {
          console.error(response.message)
        }
      },
      error: (err) => {
        console.error('❌ Fehler beim Abrufen der Antwort:', err);
      }
    });
  }

  errorChange() {
    this.sendStatus.nativeElement.classList.remove('True');
    this.sendStatus.nativeElement.classList.add('False');
    this.sendInfo = 'Deine Passwörter stimmen nicht überein';
  }
}
