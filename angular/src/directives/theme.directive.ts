import { Directive, HostListener, OnInit } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Directive({
  selector: '[appTheme]',
})
export class ThemeDirective implements OnInit {
  private mode: ThemeMode = 'light';

  ngOnInit(): void {
    const saved = localStorage.getItem('theme') as ThemeMode | null;
    this.mode = saved === 'dark' ? 'dark' : 'light';
    this.applyTheme(this.mode);
  }

  @HostListener('click')
  toggleTheme(): void {
    this.mode = this.mode === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.mode);
  }

  private applyTheme(mode: ThemeMode): void {
    document.documentElement.setAttribute('data-bs-theme', mode);
    localStorage.setItem('theme', mode);
  }
}
