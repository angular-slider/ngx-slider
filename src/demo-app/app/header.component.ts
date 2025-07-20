import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

import { environment } from '../environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router = inject(Router);

  navbarCollapsed: boolean = true;
  atRootUrl: boolean = false;
  atDocsUrl: boolean = false;
  urlSub: any;
  enableExternalImages: boolean = environment.enableExternalImages;

  ngOnInit(): void {
    this.urlSub = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.atRootUrl = event.url === '/' || event.url === '/home';
        this.atDocsUrl = event.url.indexOf('/docs') === 0;
      }
    });
  }

  ngOnDestroy(): void {
    this.urlSub.unsubscribe();
  }
}
