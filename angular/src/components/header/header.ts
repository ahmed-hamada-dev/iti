import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeDirective } from '../../directives/theme.directive';

@Component({
  selector: 'app-header',
  imports: [ThemeDirective, RouterLink],
  templateUrl: './header.html',
})
export class Header {}
