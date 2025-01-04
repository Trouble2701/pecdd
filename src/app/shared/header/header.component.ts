import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LoginComponent } from '../../component/login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{

  countDownDate:any;
  endDate:any
  @Input() countDown:any;
  @Input() location:string = '';
  @Input() date:string = '';
  @Input() time:string = '';
  @ViewChild('rotateBox') rotateBox: ElementRef | any;

  distance:any;
  distanceEnds:any;
  noGameDay:any;
  gameDayShow:any;
  days:any = 0;
  dayName:string = 'd';
  hours:number = 0;
  hoursNull:string = '';
  hoursPoints:string = ':'
  minutes:number = 0;
  minutesNull:string = '';
  minutesPoints:string = ':'
  seconds:number = 0;
  secondsNull:string = '';
  now:any;

  constructor(){
    this.countDownDate = new Date("Jan 4, 2025 14:00:00").getTime();
    this.endDate = new Date("Jan 4, 2025 14:30:00").getTime();
    this.noGameDay = new Date("Jan 4, 2025 14:35:00").getTime();
    this.location = 'Gotcha Zone';
    this.date = '18.01.2025';
    this.time = '21:00 - 01:00';
    setInterval(() => this.countDownStart(), 1000);
  }

  openGameDay(){
    if(this.gameDayShow > 0){
      alert('Next GameDay');
      this.rotateBox.nativeElement.setAttribute('style', 'cursor:default;');
    }
  }

  countDownStart(){
    this.now = new Date().getTime();
    this.distance = this.countDownDate - this.now;
    this.distanceEnds = this.endDate - this.now;
    this.gameDayShow = this.noGameDay - this.now;
      
    // Time calculations for days, hours, minutes and seconds
    this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

    this.countDownData();
    this.countDownOutPut();
  }

  countDownData(){
    this.countDownDaysData();
    this.countDownHoursData();
    this.countDownMinutesData();
    this.countDownSecondsData();
  }

  countDownDaysData(){
    if(this.hours <= 9){
      this.hoursNull = '0';
    }else if(this.hours == 0){
      this.hoursNull = '';
      this.hoursPoints = '';
    } 
  }

  countDownHoursData(){
    if(this.minutes <= 9){
      this.minutesNull = '0';
    }else if(this.minutes == 0){
      this.minutesNull = '';
      this.minutesPoints = ':';
    }
  }

  countDownMinutesData(){
    if(this.seconds <= 9){
      this.secondsNull = '0';
    }else if(this.seconds == 0){
      this.secondsNull = '';
    }
  }

  countDownSecondsData(){
    if(this.days == 0){
      this.days = '';
      this.dayName = '';
    }else{
      this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
      this.dayName = 'd ';
    }
  }

  countDownOutPut(){
    this.countDown = this.days + this.dayName + this.hoursNull + this.hours + this.hoursPoints + this.minutesNull + this.minutes + this.minutesPoints + this.secondsNull + this.seconds;

    if (this.distance < 0) this.countDown = "GameDay Start";

    if(this.distanceEnds < 0) this.countDown = "GameDay Ends";

    if(this.gameDayShow < 0){
      this.countDown = "No Game"
      this.location = '';
      this.date = '';
      this.time = '';
    }

  }
}
