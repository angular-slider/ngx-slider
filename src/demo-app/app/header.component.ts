import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarCollapsed: boolean = true;
  atRootUrl: boolean = false;
  fragmentSub: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.fragmentSub = this.route.url.subscribe((url: UrlSegment[]) => {
      this.atRootUrl = (url.length === 0) || (url.length === 1 && url[0].path === 'home');
    });
  }

  ngOnDestroy(): void {
    this.fragmentSub.unsubscribe();
  }
}
