import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gamedaycounter',
  standalone: true,
  imports: [],
  templateUrl: './gamedaycounter.component.html',
  styleUrl: './gamedaycounter.component.scss'
})
export class GamedaycounterComponent {
  countDownDate:any;
  endDate:any
  @Input() gameTitle:String = 'Next GameDay';
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
    this.countDown = 'Lade Daten!'
    setInterval(() => this.countDownStart(), 1000);
  }

  openGameDay(){
    if(this.gameDayShow > 0){
      alert('Next GameDay');
    }
  }

  countDownStart(){
    this.countDownDate = new Date("Jan 4, 2025 15:35:00").getTime();
    this.endDate = new Date("Jan 4, 2025 15:37:00").getTime();
    this.noGameDay = new Date("Jan 4, 2025 15:39:00").getTime();
    this.location = 'Gotcha Zone';
    this.date = '18.01.2025';
    this.time = '21:00 - 01:00';
    this.now = new Date().getTime();
    this.distance = this.countDownDate - this.now;
    this.distanceEnds = this.endDate - this.now;
    this.gameDayShow = this.noGameDay - this.now;
      
    this.distance > 0 ? this.dontPlay() : this.playTimeCounter();

    this.countDownData();
    this.countDownOutPut();
  }

  countDownData(){
    this.countDownDaysData();
    this.countDownHoursData();
    this.countDownMinutesData();
    this.countDownSecondsData();
  }

  countDownHoursData(){
    if(this.hours <= 9){
      this.hoursNull = '0';
    }else if(this.hours == 0 || this.hours > 9){
      this.hoursNull = '';
      this.hoursPoints = '';
    } 
  }

  countDownMinutesData(){
    if(this.minutes <= 9){
      this.minutesNull = '0';
    }else if(this.minutes == 0 || this.minutes > 9){
      this.minutesNull = '';
      this.minutesPoints = ':';
    }
  }

  countDownSecondsData(){
    if(this.seconds <= 9){
      this.secondsNull = '0';
    }else if(this.seconds == 0 || this.seconds > 9){
      this.secondsNull = '';
    }
  }

  countDownDaysData(){
    if(this.days == 0){
      this.days = '';
      this.dayName = '';
    }else{
      this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
      this.dayName = 'd ';
    }
  }

  countDownOutPut(){
    this.rotateBox.nativeElement.setAttribute('style', 'cursor:pointer;');
    this.countDown = this.days + this.dayName + this.hoursNull + this.hours + this.hoursPoints + this.minutesNull + this.minutes + this.minutesPoints + this.secondsNull + this.seconds;

    if (this.distance < 0 && this.distanceEnds > 0){
      this.gameTitle = "Play Time";
      this.playTimeCounter();
    }

    if(this.distanceEnds < 0 && this.distance < 0){
      this.gameTitle = "GameDay Ends";
      this.countDown = "Schade :-(";
    }

    if(this.gameDayShow < 0){
      this.gameTitle = "Next GameDay";
      this.countDown = "Kein Game"
      this.location = '';
      this.date = '';
      this.time = '';
      this.rotateBox.nativeElement.setAttribute('style', 'cursor:default;');
    }
  }

  playTimeCounter(){
    this.days = 0;
    this.hours = Math.floor((this.distanceEnds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((this.distanceEnds % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((this.distanceEnds % (1000 * 60)) / 1000);
  }

  dontPlay(){
    this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
  }
}
