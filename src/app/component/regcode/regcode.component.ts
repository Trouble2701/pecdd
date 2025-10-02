import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

interface MailObjekt {
  email: string;
  first_name: string;
  last_name: string;
}
@Component({
    selector: 'app-regcode',
    imports: [FormsModule],
    templateUrl: './regcode.component.html',
    styleUrl: './regcode.component.scss'
})

export class RegcodeComponent {

  http = inject(HttpClient);

  @ViewChild('sendStatus') sendStatus : ElementRef | any

  regcode = {
    firstname: '',
    lastname: '',
    email: '',
    user: 'Nein',
    contact: 'RegCode',
    start: 'einen',
    allEmails: [] as string[]
  }

  public setMails: MailObjekt[] = [];

   post = {
    endPoint: 'http://vorlage.paintball-evolution-crew.de/php/sendmail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  sendInfo = '';

  dropdownOpen = false;
  selectedOption = 'Nein';
  options = [
    { label: 'Ja', value: 'Ja' },
    { label: 'Nein', value: 'Nein' }
  ];

  constructor(private router: Router) {
    this.fetchAreas();
  }

  toggleDropdown(event: Event) {
    event.stopPropagation(); // Verhindert das Schließen direkt nach dem Öffnen
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: { label: string; value: string }) {
    this.selectedOption = option.label;
    this.dropdownOpen = false;

    this.regcode.user = option.label
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event?: Event) {
    this.dropdownOpen = false;
  }

  

  fetchAreas() {
    this.http.get('http://vorlage.paintball-evolution-crew.de/php/api/loadadminteam.php')
      .subscribe(data => {
        // Die abgerufenen Daten in der `areas`-Variable speichern
        this.setMails = data as any[];
        this.setAllMails()
      }, error => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });
  }

  setAllMails(){
    this.regcode.allEmails = this.setMails.map(mailObjekt => {
      return `${mailObjekt.email}, ${mailObjekt.first_name} ${mailObjekt.last_name}`
    });
  }

  sendQuestion(){
    if(this.regcode.firstname && this.regcode.lastname && this.regcode.email){
      this.sendStatus.nativeElement.classList.remove('False');
      this.sendStatus.nativeElement.classList.add('True');
      this.sendInfo = 'Deine Anfrage wurde gesendet';

      this.http.post(this.post.endPoint, this.post.body(this.regcode))
        .subscribe({
          next: (response) => {
    
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {
            setTimeout(() => {
              this.router.navigate(['/regist'])
            }, 2000);        
          },
        });
    }else{
      this.sendStatus.nativeElement.classList.remove('True');
      this.sendStatus.nativeElement.classList.add('False');
      this.sendInfo = 'Bitte alles ausfüllen';
    }
  }
}
