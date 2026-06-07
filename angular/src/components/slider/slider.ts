import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { SliderData } from '../../models/slider-data';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.html',
})
export class Slider implements OnInit, OnDestroy {
  slider: SliderData;
  currentIndex: number = 0;
  isPlaying: boolean = false;
  private intervalId: number | null = null;
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.slider = new SliderData();
  }

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slider.images.length;
    if (this.isPlaying) this.resetAutoPlay();
    this.cdr.detectChanges();
  }

  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.slider.images.length) % this.slider.images.length;
    if (this.isPlaying) this.resetAutoPlay();
    this.cdr.detectChanges();
  }

  goTo(index: number): void {
    this.currentIndex = index;
    if (this.isPlaying) this.resetAutoPlay();
    this.cdr.detectChanges();
  }

  togglePlay(): void {
    if (this.isPlaying) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
    this.cdr.detectChanges();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.isPlaying = true;
    this.intervalId = window.setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slider.images.length;
      this.cdr.detectChanges();
    }, 3000);
  }

  private stopAutoPlay(): void {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
