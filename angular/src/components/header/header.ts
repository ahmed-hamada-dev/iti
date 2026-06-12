import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeDirective } from '../../directives/theme.directive';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeDirective, RouterLink, AsyncPipe],
  templateUrl: './header.html',
})
export class Header {
  auth = inject(AuthService);
}
