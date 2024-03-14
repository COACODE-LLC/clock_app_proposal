import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isRunning = false;
  timeLeft = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  timerInterval: any;

  constructor() { }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        console.log('tick')
        this.timeLeft--;
        this.hours = Math.floor(this.timeLeft / 3600);
        this.minutes = Math.floor(this.timeLeft % 3600 / 60);
        this.seconds = Math.floor(this.timeLeft % 60);
      } else {
        console.log('tock');
        this.finish();
      }
    }, 1000);
  }


  cancelTimer(): void {
    this.timeLeft = 0;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.finish();
  }

  finish(): void {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    console.log('Timer is finished!');
  }

  populateColumnOptions(count: number) {
    const options: any[] = [];
    for (let i = 0; i < count; i++) {
      options.push({ text: i.toString(), value: i });
    }
    return options;
  }

  public pickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value: any) => {
        this.timeLeft = value.hours.value * 3600 + value.minutes.value * 60 + value.seconds.value;
        this.hours = Math.floor(this.timeLeft / 3600);
        this.minutes = Math.floor(this.timeLeft % 3600 / 60);
        this.seconds = Math.floor(this.timeLeft % 60);
        this.isRunning = true;
      },
    },
  ];

  public pickerColumns = [
    {
      name: 'hours',
      options: this.populateColumnOptions(24),
    },
    {
      name: 'minutes',
      options: this.populateColumnOptions(60),
    },
    {
      name: 'seconds',
      options: this.populateColumnOptions(60),
    }
  ];
}