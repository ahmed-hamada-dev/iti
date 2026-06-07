import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeDirective } from '../../directives/theme.directive';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ThemeDirective],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
