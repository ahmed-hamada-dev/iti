import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Header } from '../components/header/header';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private router = inject(Router);
  protected loadingService = inject(LoadingService);
  showHeader = true;

  ngOnInit(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      let route = this.router.routerState.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      this.showHeader = route.routeConfig?.path !== '**';
    });
  }
}
