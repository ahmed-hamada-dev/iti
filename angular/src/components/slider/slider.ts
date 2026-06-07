import { Component, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { SliderData } from '../../models/slider-data';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
})
export class Slider implements OnDestroy {
  slider: SliderData;
  currentIndex: number = 0;
  isPlaying: boolean = false;
  private intervalId: number | null = null;
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.slider = new SliderData();
  }

  display(): void {
    this.stop();
    this.isPlaying = true;
    this.next();
    this.intervalId = window.setInterval(() => {
      this.next();
    }, 1500);
  }

  stop(): void {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slider.images.length;
    this.cdr.detectChanges();
  }

  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.slider.images.length) % this.slider.images.length;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.stop();
  }
}
