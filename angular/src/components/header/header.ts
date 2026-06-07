import { Component } from '@angular/core';
import { ThemeDirective } from '../../directives/theme.directive';

@Component({
  selector: 'app-header',
  imports: [ThemeDirective],
  templateUrl: './header.html',
})
export class Header {}
