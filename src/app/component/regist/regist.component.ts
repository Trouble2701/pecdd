import { Component, HostListener } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-regist',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, HttpClientModule],
  templateUrl: './regist.component.html',
  styleUrl: './regist.component.scss'
})
export class RegistComponent {

  constructor(private router: Router, private http: HttpClient){}

  ngOnInit() {
    this.selectedOption = this.options.find(opt => opt.value === this.regData.gender)?.label || 'Auswählen';
  }

  regData = {
    firstname: '',
    lastName: '',
    birthday: '',
    gender: 'm',
    loginName: '',
    email: '',
    password: '',
    passwordCheck: '',
    registerCode: ''
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

  save() {
    console.log(this.regData);
    this.http.post('php/api/saveUser.php', { 
      first_name: this.regData.firstname, 
      last_name: this.regData.lastName,  
      nickname: this.regData.loginName, 
      email: this.regData.email,
      password: this.regData.password
    }).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Erfolg:', response.message);
          console.log('Benutzer-ID:', response.ID);
        } else {
          console.error('Fehler:', response.error);
        }
      },
      error => {
        console.error('Fehler beim Abrufen der Antwort:', error);
      }
    );
  }  
}
