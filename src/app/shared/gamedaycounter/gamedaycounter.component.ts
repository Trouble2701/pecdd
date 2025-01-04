import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gamedaycounter',
  standalone: true,
  imports: [],
  templateUrl: './gamedaycounter.component.html',
  styleUrl: './gamedaycounter.component.scss'
})
export class GamedaycounterComponent {
  countDownDate: any;
  endDate: any
  @Input() gameTitle: String = 'Next GameDay';
  @Input() countDown: any;
  @Input() location: string = '';
  @Input() date: string = '';
  @Input() time: string = '';
  @Input() load: string = 'Lade Daten';
  @ViewChild('rotateBox') rotateBox: ElementRef | any;

  setDateInterval: any;
  countDownInterval: any;

  distance: any;
  distanceEnds: any;
  noGameDay: any;
  gameDayShow: any;
  days: any = 0;
  dayName: string = 'd';
  hours: number = 0;
  hoursNull: string = '';
  hoursPoints: string = ':'
  minutes: number = 0;
  minutesNull: string = '';
  minutesPoints: string = ':'
  seconds: number = 0;
  secondsNull: string = '';
  now: any;

  startDay: number = 1;
  startMonth: number = 1;
  startYear: number = 2025;
  startHour: number = 0;
  startMinutes: number = 0;
  endDay: number = 1;
  endMonth: number = 1;
  endYear: number = 2025;
  endHour: number = 1;
  endMinutes: number = 1;
  startCountDown: any = '';
  endCountDown: any = '';
  noCountDown: any = '';

  month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  constructor() {
    this.setDateInterval = setInterval(() => this.setDate(), 1000);
    this.countDownInterval = setInterval(() => this.countDownStart(), 1000);
  }

  //opens the current GameDay
  openGameDay() {
    if (this.gameDayShow > 0) {
      alert('Next GameDay');
    }
  }

  //Set Start and End Datas
  setDate() {
    this.startDay = 4;
    this.startMonth = 1;
    this.startYear = 2025;
    this.startHour = 17;
    this.startMinutes = 46;
    this.endDay = 4;
    this.endMonth = 1;
    this.endYear = 2025;
    this.endHour = 17;
    this.endMinutes = 48;
    this.SetDataCountDownd(this.startMonth, this.endMonth);
  }

  //Set the current Date Data
  SetDataCountDownd(startNumber: number, endNumber: number) {
    let startCalcMonth = this.month[startNumber - 1];
    let endCalcMonth = this.month[endNumber - 1];
    let noHour = this.endHour;
    let noMin = this.endMinutes + 2;

    this.startCountDown = startCalcMonth + ' ' + this.startDay + ', ' + this.startYear + ' ' + this.startHour + ':' + this.startMinutes + ':00';
    this.endCountDown = endCalcMonth + ' ' + this.endDay + ', ' + this.endYear + ' ' + this.endHour + ':' + this.endMinutes + ':00';
    this.noCountDown = endCalcMonth + ' ' + this.endDay + ', ' + this.endYear + ' ' + noHour + ':' + noMin + ':00';
  }

  //Set the Distance
  countDownStart() {
    this.setAllData();
    this.distance = this.countDownDate - this.now;
    this.distanceEnds = this.endDate - this.now;
    this.gameDayShow = this.noGameDay - this.now;

    this.distance > 0 ? this.dontPlay() : this.playTimeCounter();

    this.countDownData();
    this.countDownOutPut();
  }

  //Set the current Data of All Dates and Times
  setAllData() {
    this.countDownDate = new Date(this.startCountDown).getTime();
    this.endDate = new Date(this.endCountDown).getTime();
    this.noGameDay = new Date(this.noCountDown).getTime();
    this.location = 'Gotcha Zone';
    this.date = this.dateCalc();
    this.time = this.timeCalc();
    this.now = new Date().getTime();
  }

  //Set the Date of the current GameDay
  dateCalc() {
    let day: any = this.startDay;
    let month: any = this.startMonth;

    if (this.startDay < 10) day = '0' + this.startDay;
    if (this.startMonth < 10) month = '0' + this.startMonth;

    return day + '.' + month + '.' + this.startYear;
  }

  //Set the Time of the current GameDay
  timeCalc() {
    let calcHourStart: any = this.startHour;
    let calcMinStart: any = this.startMinutes;
    let calcHourEnd: any = this.endHour;
    let calcMinEnd: any = this.endMinutes;

    if (this.startHour < 10) calcHourStart = '0' + this.startHour;
    if (this.startMinutes < 10) calcMinStart = '0' + this.startMinutes;
    if (this.endHour < 10) calcHourEnd = '0' + this.endHour;
    if (this.endMinutes < 10) calcMinEnd = '0' + this.endMinutes;

    return calcHourStart + ':' + calcMinStart + ' - ' + calcHourEnd + ':' + calcMinEnd;
  }

  //Start all function of Date And Time for set 0 < 10;
  countDownData() {
    this.countDownDaysData();
    this.countDownHoursData();
    this.countDownMinutesData();
    this.countDownSecondsData();
  }

  //Set Hour 0 if < 10
  countDownHoursData() {
    if (this.hours <= 9) this.hoursNull = '0'
    else if (this.hours > 9) this.hoursNull = '';
  }

  //Set Minutes 0 if < 10
  countDownMinutesData() {
    if (this.minutes <= 9) this.minutesNull = '0';
    else if (this.minutes > 9) this.minutesNull = '';
  }

  //Set Seconds 0 if < 10
  countDownSecondsData() {
    if (this.seconds <= 9) this.secondsNull = '0';
    else if (this.seconds > 9) this.secondsNull = '';
  }

  //Set d after Day 0 if < 10 and set clear if days = 1 
  countDownDaysData() {
    if (this.days == 0) {
      this.days = '';
      this.dayName = '';
    } else {
      this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
      this.dayName = 'd ';
    }
  }

  //This ist Start the Output
  countDownOutPut() {
    this.load = '';
    this.rotateBox.nativeElement.setAttribute('style', 'cursor:pointer;');
    this.countDown = this.days + this.dayName + this.hoursNull + this.hours + ':' + this.minutesNull + this.minutes + ':' + this.secondsNull + this.seconds;

    if (this.distance < 0 && this.distanceEnds > 0 && this.gameDayShow > 0) this.gameTitle = "Play Time";

    if (this.distanceEnds < 0 && this.distance < 0 && this.gameDayShow > 0) {
      this.gameTitle = "GameDay Ends";
      this.countDown = "Schade :-(";
    }

    if (this.distanceEnds < 0 && this.distance < 0 && this.gameDayShow < 0) this.clearData();
  }

  //Clear Data aber End of GameDay
  clearData() {
    this.gameTitle = "Next GameDay";
    this.load = "Kein Game";
    this.countDown = '';
    this.location = '';
    this.date = '';
    this.time = '';
    this.rotateBox.nativeElement.setAttribute('style', 'cursor:default;');
    setTimeout(() => {
      clearInterval(this.setDateInterval);
      clearInterval(this.countDownInterval);
    }, 2000);
  }

  //PlayTime Time
  playTimeCounter() {
    this.days = 0;
    this.hours = Math.floor((this.distanceEnds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((this.distanceEnds % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((this.distanceEnds % (1000 * 60)) / 1000);
  }

  //Next GameDay Time
  dontPlay() {
    this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
  }
}