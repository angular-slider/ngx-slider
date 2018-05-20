import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class.test-mode')
  testMode: boolean = false;
  private sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params: any): void => {
      this.testMode = params['testMode'] === 'true';
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
