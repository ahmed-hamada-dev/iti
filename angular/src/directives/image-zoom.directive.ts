import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImageZoom]',
})
export class ImageZoomDirective {
  @Input() zoomScale: string = '1.15';

  constructor(private el: ElementRef<HTMLElement>) {
    this.el.nativeElement.style.transition = 'transform 0.4s ease';
    this.el.nativeElement.style.cursor = 'zoom-in';
    this.el.nativeElement.style.display = 'block';
  }

  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.transform = `scale(${this.zoomScale})`;
  }

  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.transform = 'scale(1)';
  }
}
