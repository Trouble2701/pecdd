import { Component, HostListener } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-regcode',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './regcode.component.html',
  styleUrl: './regcode.component.scss'
})
export class RegcodeComponent {

  dropdownOpen = false;
  selectedOption = 'Nein';
  options = [
    { label: 'Ja', value: 'ja' },
    { label: 'Nein', value: 'nein' }
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
