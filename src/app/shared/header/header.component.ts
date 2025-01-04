import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{

  countDownDate:any;
  now:any;
  distance:any;
  x:any;
  days:any;
  hours:any;
  minutes:any;
  seconds:any;


  constructor(){
    this.countDownDate = new Date("Jan 18, 2025 21:00:00").getTime();
    this.now = new Date().getTime();
    setInterval(() => this.countDownStart(), 1000);
  }

  openGameDay(){
    alert('Next GameDay');
  }

  countDownStart(){

    this.distance = this.countDownDate - this.now;
      
    // Time calculations for days, hours, minutes and seconds
    this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24))+"d ";
    this.hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))+":";
    this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60))+":";
    this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

    if(this.hours < 10){
      this.hours = "0"+Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))+":";
    }

    if(this.minutes < 10){
      this.minutes = "0"+Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60))+":";
    }

    if(this.seconds < 10){
      this.seconds = "0"+Math.floor((this.distance % (1000 * 60)) / 1000);
    }

    console.log(this.days + this.hours + this.minutes + this.seconds);
      
    // Output the result in an element with id="demo"
      
    // If the count down is over, write some text 
    /*if (this.distance < 0) {
      clearInterval(this.x);
      document.getElementById("demo").innerHTML = "EXPIRED";
      window.location = logoutUrl;
    }*/
  }
}
