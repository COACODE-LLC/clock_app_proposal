import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, map, Subject } from 'rxjs';
import { takeUntil, takeWhile, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  private stop$ = new Subject<void>;
  private value_: number = 0;
  public buffer_: number = this.value_;
  public timeLeft = 0;

  timer$ = timer(0, 1000).pipe(
    takeUntil(this.stop$),
    takeWhile(() => this.value_ < 1),
    finalize(() => this.finish()),
    map(() => {
      this.value_ += 0.075;
      return this.value_;
    })
  );

  public pickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value: any) => {
        console.log('Time in seconds: ', this.timeLeft)        
        this.timeLeft = value.hours.value * 3600 + value.minutes.value * 60 + value.seconds.value;
        
      },
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.stop$.next();
  }

  finish(): void {
    console.log('Timer is finished!');
  }

  public pickerColumns = [
    {
      name: 'hours',
      options: [
        {
          text: '0',
          value: 0,
        },
        {
          text: '1',
          value: 1,
        },
        {
          text: '2',
          value: 2,
        },
        {
          text: '3',
          value: 3,
        },
      ],
    },
    {
      name: 'minutes',
      options: [
        {
          text: '0',
          value: 0,
        },
        {
          text: '1',
          value: 1,
        },
        {
          text: '2',
          value: 2,
        },
        {
          text: '3',
          value: 3,
        },
        {
          text: '4',
          value: 4,
        },
        {
          text: '5',
          value: 5,
        },
        {
          text: '6',
          value: 6,
        },
        {
          text: '7',
          value: 7,
        },
        {
          text: '8',
          value: 8,
        },
        {
          text: '9',
          value: 9,
        },
        {
          text: '10',
          value: 10,
        },
      ],
    },
    {
      name: 'seconds',
      options: [
        {
          text: '0',
          value: 0,
        },
        {
          text: '1',
          value: 1,
        },
        {
          text: '2',
          value: 2,
        },
        {
          text: '3',
          value: 3,
        },
        {
          text: '4',
          value: 4,
        },
        {
          text: '5',
          value: 5,
        },
        {
          text: '6',
          value: 6,
        },
        {
          text: '7',
          value: 7,
        },
        {
          text: '8',
          value: 8,
        },
        {
          text: '9',
          value: 9,
        },
        {
          text: '10',
          value: 10,
        },
      ],
    },
  ];
  
}