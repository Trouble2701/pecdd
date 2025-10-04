import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewlinePipe } from '../../newline.pipe';

interface StartTextObject {
  start_text: string;
}

@Component({
  selector: 'app-start',
  imports: [NewlinePipe],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {

  starttext:string = ''

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.fetchStart()
  }


  // GET-Anfrage zum Abrufen der Daten
  fetchStart() {
    this.http.get<StartTextObject[]>('http://vorlage.paintball-evolution-crew.de/php/api/start.php')
      .subscribe(data => {
        // 2. Prüfen, ob das Array Daten enthält
          if (data && data.length > 0) {
              // Greife auf das erste Element des Arrays [0] und dann auf die Eigenschaft 'start_text' zu
              this.starttext = data[0].start_text; 
          } else {
              this.starttext = 'Herzlich Willkommen.';
              console.warn('Die Datenbank-Antwort war leer.');
          }
      }, error => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });
  }
}
