import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-locations',
    imports: [
        // TODO: `HttpClientModule` should not be imported into a component directly.
        // Please refactor the code to add `provideHttpClient()` call to the provider list in the
        // application bootstrap logic and remove the `HttpClientModule` import from this component.
        HttpClientModule
    ],
    templateUrl: './locations.component.html',
    styleUrl: './locations.component.scss'
})
export class LocationsComponent {

  areas: any[] = [];
  websites = [
    { url: 'https://example.com', name: 'Example' },
    { url: 'https://angular.io', name: 'Angular' }
  ];

  
  constructor(private http: HttpClient) {}
  ngOnInit(){
    this.fetchAreas()
  }


  // GET-Anfrage zum Abrufen der Daten
  fetchAreas() {
    this.http.get('php/api/areas.php')
      .subscribe(data => {
        // Die abgerufenen Daten in der `areas`-Variable speichern
        this.areas = data as any[];
  
        // Sicherstellen, dass es tatsächlich Bereiche gibt
        if (this.areas && this.areas.length > 0) {
          console.log('Antwort vom Server (GET):', this.areas);
  
          // Durch jede Area iterieren und die Adressen in Google Maps öffnen
          /* this.areas.forEach(area => {
            this.openAdress(area); // Für jede Area die Adresse öffnen
          }); */
        }
      }, error => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });
  }

  openAdress(area: any) {
    if (area && area.adress && area.number && area.zip_code && area.location) {
      // Adresse zusammensetzen
      let adresse = area.adress + ' ' + area.number + ', ' + area.zip_code + ' ' + area.location;
      
      // Adresse URL-encodieren
      const encodedAdresse = encodeURIComponent(adresse);
      
      // Google Maps URL erstellen
      const googleMapsUrl = `https://www.google.com/maps?q=${encodedAdresse}`;
      
      // Google Maps in neuem Tab öffnen
      console.log(window.open(googleMapsUrl, "_blank"));
    } else {
      console.error('Die Adresse ist unvollständig:', area);
    }
  }

  imgSearch(img:any){
    return img ? img : 'logo.png'

  }

  websiteShow(web:any){
    return web ? `<a href="${web}" target="_blank">zur Website</a>` : '';
  }
}
