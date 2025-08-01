import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-startanimation',
  imports: [],
  templateUrl: './startanimation.component.html',
  styleUrl: './startanimation.component.scss'
})
export class StartanimationComponent implements OnInit, OnDestroy{
@ViewChild('start_intro') startIntro : ElementRef | any;
@ViewChild('background') background : ElementRef | any

    private routerSubscription: Subscription | null = null;

    constructor(private router: Router, private http: HttpClient){ }

    ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Hier wird dein Code bei jeder erfolgreichen Navigation ausgeführt
      console.log('Neue URL:', event.urlAfterRedirects);
      
      // Du kannst auch hier die URL mit einem Wert vergleichen
      if (event.urlAfterRedirects === '/') {

        this.background.nativeElement.classList.remove('background-dont');
        this.background.nativeElement.classList.add('background');

        setTimeout(() => {
            this.startIntro.nativeElement.classList.remove('startscreen');
            this.startIntro.nativeElement.classList.add('startscreen-outro');
        }, 200);

        setTimeout(() => {
          this.startIntro.nativeElement.classList.remove('startscreen-outro');
          this.startIntro.nativeElement.classList.add('startscreen-hidden');
        }, 1200);
        setTimeout(() => {
          this.background.nativeElement.classList.add('background-out');
        }, 1250);
        console.log('Intro Start');
      }
    });
  }

  ngOnDestroy(): void {
    // Wichtig: Das Abonnement beenden, um Memory Leaks zu vermeiden
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
