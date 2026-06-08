import { Component } from '@angular/core';
import {
  Subject,
  Subscription,
  interval,
  map,
  takeUntil,
  takeWhile,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // progress = 0; // Initial progress (percentage)
  currentTime = 0; // Current time in seconds
  totalTime = 5 * 60; // Total time in seconds (5 minutes)
  isRunning = false;
  destroy$ = new Subject<void>();

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  startTimer() {
    this.isRunning = true;
    const timer$ = interval(1000); // Emit every second
    timer$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.currentTime++;
      this.progress = Math.floor((1 - this.currentTime / this.totalTime) * 100);
      if (this.currentTime === this.totalTime) {
        this.resetTimer();
      }
    });
  }
  resetTimer() {
    this.currentTime = 0;
    this.progress = 0;
  }
}
