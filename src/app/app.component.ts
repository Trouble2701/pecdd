import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { StartanimationComponent } from './component/startanimation/startanimation.component';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, StartanimationComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pecdd';
  users: any[] = [];
  

  constructor(private http: HttpClient) {
    this.fetchAreas()
  }

  fetchAreas() {
    this.http.get('php/api/user.php')
      .subscribe(data => {
        this.users = data as any[];
      });
  }
}
