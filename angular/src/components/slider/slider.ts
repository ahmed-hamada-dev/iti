import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, signal } from '@angular/core';
import { SliderData } from '../../models/slider-data';

@Component({
  selector: 'app-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './slider.html',
})
export class Slider implements OnInit, OnDestroy {
  slider: SliderData;
  currentIndex = signal(0);
  isPlaying = signal(false);
  private intervalId: number | null = null;

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
    this.currentIndex.set((this.currentIndex() + 1) % this.slider.images.length);
    if (this.isPlaying()) this.resetAutoPlay();
  }

  prev(): void {
    this.currentIndex.set(
      (this.currentIndex() - 1 + this.slider.images.length) % this.slider.images.length,
    );
    if (this.isPlaying()) this.resetAutoPlay();
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
    if (this.isPlaying()) this.resetAutoPlay();
  }

  togglePlay(): void {
    if (this.isPlaying()) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.isPlaying.set(true);
    this.intervalId = window.setInterval(() => {
      this.currentIndex.set((this.currentIndex() + 1) % this.slider.images.length);
    }, 3000);
  }

  private stopAutoPlay(): void {
    this.isPlaying.set(false);
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
