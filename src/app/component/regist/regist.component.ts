import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-regist',
    imports: [CommonModule, NgIf, NgFor, FormsModule,
        // TODO: `HttpClientModule` should not be imported into a component directly.
        // Please refactor the code to add `provideHttpClient()` call to the provider list in the
        // application bootstrap logic and remove the `HttpClientModule` import from this component.
        HttpClientModule],
    templateUrl: './regist.component.html',
    styleUrl: './regist.component.scss'
})
export class RegistComponent {

  @ViewChild('loginNameTrue') loginNameTrue: ElementRef | any;
  @ViewChild('loginNameFalse') loginNameFalse: ElementRef | any;
  @ViewChild('emailTrue') emailTrue: ElementRef | any;
  @ViewChild('emailFalse') emailFalse: ElementRef | any;
  @ViewChild('passTrue') passTrue: ElementRef | any;
  @ViewChild('passFalse') passFalse: ElementRef | any;
  @ViewChild('passSecondTrue') passSecondTrue: ElementRef | any;
  @ViewChild('passSecondFalse') passSecondFalse: ElementRef | any;
  @ViewChild('regCodeTrue') regCodeTrue: ElementRef | any;
  @ViewChild('regCodeFalse') regCodeFalse: ElementRef | any;
  @ViewChild('firstNameTrue') firstNameTrue: ElementRef | any;
  @ViewChild('firstNameFalse') firstNameFalse: ElementRef | any;
  @ViewChild('lastNameTrue') lastNameTrue: ElementRef | any;
  @ViewChild('lastNameFalse') lastNameFalse: ElementRef | any;
  @ViewChild('birthdayTrue') birthdayTrue: ElementRef | any;
  @ViewChild('birthdayFalse') birthdayFalse: ElementRef | any;
  @ViewChild('fillFields') fillFields: ElementRef | any;
  @ViewChild('regSave') regSave: ElementRef | any;
  @ViewChild('regSaveFalse') regSaveFalse: ElementRef | any;

  constructor(private router: Router, private http: HttpClient){}

  ngOnInit() {
    this.selectedOption = this.options.find(opt => opt.value === this.regData.gender)?.label || 'Auswählen';
  }

  regData = {
    firstname: '',
    lastName: '',
    loginName: '',
    email: '',
    birthday: '',
    gender: 'm',
    password: '',
    passwordSecond: '',
    registerCode: '',
    loginNameCheck: false,
    emailCheck: false,
    passwordCheck: false,
    registerCodeCheck: false,
    firstNameCheck: false,
    lastNameCheck: false,
    birthdayCheck: false,
  }

  sendCode(){
    this.router.navigate(['/registcode']);
  }

  dropdownOpen = false;
  options = [
    { label: 'Männlich', value: 'm' },
    { label: 'Weiblich', value: 'w' }
  ];
  selectedOption = this.options.find(opt => opt.value === this.regData.gender)?.label || 'Auswählen';

  toggleDropdown(event: Event) {
    event.stopPropagation(); // Verhindert das Schließen direkt nach dem Öffnen
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: { label: string; value: string }) {
    this.selectedOption = option.label;
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event?: Event) {
    this.dropdownOpen = false;
  }

  checkNickName(): void {
    const nickname = this.regData.loginName;
  
    if (!nickname || nickname.trim() === '') {
      this.loginNameFalse.nativeElement.setAttribute('style', 'display:unset');
      this.loginNameTrue.nativeElement.setAttribute('style', 'display:none');
      return;
    }
  
    this.http.post<any>('php/api/checkLoginName.php', { nickname }).subscribe({
      next: (response) => {
        if (response.success) {
          this.regData.loginNameCheck = false;
          this.loginNameFalse.nativeElement.setAttribute('style', 'display:unset');
          this.loginNameTrue.nativeElement.setAttribute('style', 'display:none');
        } else {
          this.regData.loginNameCheck = true;
          this.loginNameFalse.nativeElement.setAttribute('style', 'display:none');
          this.loginNameTrue.nativeElement.setAttribute('style', 'display:unset');
        }
      },
      error: (err) => {
        console.error('❌ Fehler beim Abrufen der Antwort:', err);
      }
    });
  }

  checkEmail(){
      var validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
      if (this.regData.email.match(validRegex)) {
        this.checkExistEmail();  
      } else {
        this.emailFalse.nativeElement.setAttribute('style', 'display:unset');
        this.emailTrue.nativeElement.setAttribute('style', 'display:none');  
      }
  }

  checkExistEmail(){
    const email = this.regData.email.toLowerCase();
  
    if (!email || email.trim() === '') {
      this.emailFalse.nativeElement.setAttribute('style', 'display:unset');
      this.emailTrue.nativeElement.setAttribute('style', 'display:none');
      return;
    }
  
    this.http.post<any>('php/api/checkEmail.php', { email }).subscribe({
      next: (response) => {
        if (response.success) {
          this.regData.emailCheck = false;
          this.emailFalse.nativeElement.setAttribute('style', 'display:unset');
          this.emailTrue.nativeElement.setAttribute('style', 'display:none');
        } else {
          this.regData.emailCheck = true;
          this.emailTrue.nativeElement.setAttribute('style', 'display:unset');
          this.emailFalse.nativeElement.setAttribute('style', 'display:none');
        }
      },
      error: (err) => {
        console.error('❌ Fehler beim Abrufen der Antwort:', err);
      }
    });
  }

  checkRegCode(){
    const regCode = this.regData.registerCode;
  
    if (!regCode || regCode.trim() === '') {
      this.regCodeFalse.nativeElement.setAttribute('style', 'display:unset');
      this.regCodeTrue.nativeElement.setAttribute('style', 'display:none');
      return;
    }
  
    this.http.post<any>('php/api/checkRegCode.php', { regCode }).subscribe({
      next: (response) => {
        if (response.success) {
          this.regData.registerCodeCheck = true;
          this.regCodeTrue.nativeElement.setAttribute('style', 'display:unset');
          this.regCodeFalse.nativeElement.setAttribute('style', 'display:none');
        } else {
          this.regData.registerCodeCheck = false;
          this.regCodeFalse.nativeElement.setAttribute('style', 'display:unset');
          this.regCodeTrue.nativeElement.setAttribute('style', 'display:none');
        }
      },
      error: (err) => {
        console.error('❌ Fehler beim Abrufen der Antwort:', err);
      }
    });
  }

  checkFirstName(){
    if(this.regData.firstname.length > 1){
      this.firstNameTrue.nativeElement.setAttribute('style', 'display:unset');
      this.firstNameFalse.nativeElement.setAttribute('style', 'display:none');
      this.regData.firstNameCheck = true
    }else{
      this.firstNameTrue.nativeElement.setAttribute('style', 'display:none');
      this.firstNameFalse.nativeElement.setAttribute('style', 'display:unset');
      this.regData.firstNameCheck = false
    }
  }

  checkLastName(){
    if(this.regData.lastName.length > 1){
      this.lastNameTrue.nativeElement.setAttribute('style', 'display:unset');
      this.lastNameFalse.nativeElement.setAttribute('style', 'display:none');
      this.regData.lastNameCheck = true
    }else{
      this.lastNameTrue.nativeElement.setAttribute('style', 'display:none');
      this.lastNameFalse.nativeElement.setAttribute('style', 'display:unset');
      this.regData.lastNameCheck = false
    }
  }

  checkBirthday(){
    if(this.regData.birthday.length == 10){
      this.birthdayTrue.nativeElement.setAttribute('style', 'display:unset');
      this.birthdayFalse.nativeElement.setAttribute('style', 'display:none');
      this.regData.birthdayCheck = true
    }else{
      this.birthdayTrue.nativeElement.setAttribute('style', 'display:none');
      this.birthdayFalse.nativeElement.setAttribute('style', 'display:unset');
      this.regData.birthdayCheck = false
    }
  }

  checkFirstPassword(){
    if(this.checkValidation()){
      this.passTrue.nativeElement.setAttribute('style', 'display:unset');
      this.passFalse.nativeElement.setAttribute('style', 'display:none');
    }else{
      this.passTrue.nativeElement.setAttribute('style', 'display:none');
      this.passFalse.nativeElement.setAttribute('style', 'display:unset');
    }
  }

  checkSecondPassword(){
    if(this.checkValidation()){
      this.passTrue.nativeElement.setAttribute('style', 'display:unset');
      this.passFalse.nativeElement.setAttribute('style', 'display:none');
      this.checkGleichheit();
    }else{
      this.passTrue.nativeElement.setAttribute('style', 'display:none');
      this.passFalse.nativeElement.setAttribute('style', 'display:unset');
    }
  }

  checkGleichheit():any{
    this.regData.password == this.regData.passwordSecond ? this.passCheck(true, 'none', 'unset') : this.passCheck(false, 'unset', 'none')
  }

  checkValidation(){
    return /[A-Z]/       .test(this.regData.password) &&
           /[a-z]/       .test(this.regData.password) &&
           /[0-9]/       .test(this.regData.password) &&
           /[^A-Za-z0-9]/.test(this.regData.password) &&
           this.regData.password.length > 7;
  }

  passCheck(check: boolean, disFalse: string, disTrue: string){
    this.regData.passwordCheck = check
    this.passSecondFalse.nativeElement.setAttribute('style', 'display:'+disFalse);
    this.passSecondTrue.nativeElement.setAttribute('style', 'display:'+disTrue);
  }

  save() {
    if(this.checkAllData()){
      this.saveUserData()
    }else{
      this.saveUserDataFalse()
    }
  }

  checkAllData(){
    return this.regData.loginNameCheck && this.regData.emailCheck && this.regData.passwordCheck && this.regData.registerCodeCheck && this.regData.firstNameCheck && this.regData.lastNameCheck && this.regData.birthdayCheck
  }

  saveUserData(){
    console.log(this.regData);
      this.http.post('php/api/saveUser.php', { 
        first_name: this.regData.firstname, 
        last_name: this.regData.lastName,  
        nickname: this.regData.loginName, 
        email: this.regData.email.toLowerCase(),
        birthday: this.regData.birthday,
        gender: this.regData.gender,
        password: this.regData.password,
        regdate: new Date(),
        registCode: this.regData.registerCode
      }).subscribe(
        (response: any) => {
          if (response.success) {
            this.fillFields.nativeElement.setAttribute('style', 'display:none');
            this.regSave.nativeElement.setAttribute('style', 'display:unset; color: green');
            this.regSaveFalse.nativeElement.setAttribute('style', 'display:none;');
            setTimeout(() => {
              this.startSite()
            }, 2000);
          } else {
            console.error('Fehler:', response.error);
          }
        },
        error => {
          console.error('Fehler beim Abrufen der Antwort:', error);
        }
      );
  }

  saveUserDataFalse(){
    this.fillFields.nativeElement.setAttribute('style', 'display:none');
    this.regSave.nativeElement.setAttribute('style', 'display:none');
    this.regSaveFalse.nativeElement.setAttribute('style', 'display:unset; color: red');

    this.checkInputs();
  }

  checkInputs(){
    this.firstNameFalse.nativeElement.setAttribute('style', !this.regData.firstNameCheck ? 'display:unset' : 'display:none')
    this.lastNameFalse.nativeElement.setAttribute('style', !this.regData.lastNameCheck ? 'display:unset' : 'display:none')
    this.birthdayFalse.nativeElement.setAttribute('style', !this.regData.birthdayCheck ? 'display:unset' : 'display:none')
    this.loginNameFalse.nativeElement.setAttribute('style', !this.regData.loginNameCheck ? 'display:unset' : 'display:none')
    this.emailFalse.nativeElement.setAttribute('style', !this.regData.emailCheck ? 'display:unset' : 'display:none')
    this.passFalse.nativeElement.setAttribute('style', !this.regData.passwordCheck ? 'display:unset' : 'display:none')
    this.passSecondFalse.nativeElement.setAttribute('style', !this.regData.passwordCheck ? 'display:unset' : 'display:none')
    this.regCodeFalse.nativeElement.setAttribute('style', !this.regData.registerCodeCheck ? 'display:unset' : 'display:none')
  }
  
  startSite(){
    this.router.navigate(['/start'])
  }
}
