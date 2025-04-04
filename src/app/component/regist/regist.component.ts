import { Component, HostListener } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regist',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './regist.component.html',
  styleUrl: './regist.component.scss'
})
export class RegistComponent {

  constructor(private router: Router){}

  sendCode(){
    this.router.navigate(['/registcode']);
  }

  dropdownOpen = false;
  selectedOption = 'Bitte Wählen';
  options = [
    { label: 'Männlich', value: 'm' },
    { label: 'Weiblich', value: 'w' }
  ];

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
}
