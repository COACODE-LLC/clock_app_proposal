import { Component } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private stop$ = new Subject<void>();
  isRunning = false;
  timeLeft = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  interval$ = interval(1000);

  constructor() { }

  startTimer(): void {
    this.interval$.pipe(takeUntil(this.stop$)).subscribe(() => {
      if (this.timeLeft > 0) {
        console.log('tick')
        this.timeLeft--;
        this.hours = Math.floor(this.timeLeft / 3600);
        this.minutes = Math.floor(this.timeLeft % 3600 / 60);
        this.seconds = Math.floor(this.timeLeft % 60);
      } else {
        console.log('tock')
        this.finish();
      }
    });
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
    console.log('Timer is finished!');
    this.stop$.next();    
    this.stop$.complete();
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
  ]
}