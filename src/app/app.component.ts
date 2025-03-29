import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pecdd';
  areas: any[] = [];
  

  constructor(private http: HttpClient) {}
  ngOnInit(){
    //this.fetchAreas()
  }


  // GET-Anfrage zum Abrufen der Daten
  fetchAreas() {
    this.http.get('php/api/user.php')
      .subscribe(data => {
        // Die abgerufenen Daten in der `areas`-Variable speichern
        this.areas = data as any[];
        //console.log('Antwort vom Server (GET):', this.areas);
      });
  }
}
