import { Component } from '@angular/core';
import { ThemeDirective } from '../../directives/theme.directive';

@Component({
  selector: 'app-header',
  imports: [ThemeDirective],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
