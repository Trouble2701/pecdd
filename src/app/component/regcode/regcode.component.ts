import { Component, HostListener } from '@angular/core';


@Component({
    selector: 'app-regcode',
    imports: [],
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
