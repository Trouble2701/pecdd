import { Component } from '@angular/core';

@Component({
    selector: 'app-events',
    imports: [],
    templateUrl: './events.component.html',
    styleUrl: './events.component.scss'
})
export class EventsComponent {

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
}
