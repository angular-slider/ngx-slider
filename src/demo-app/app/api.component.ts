import { Component, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements AfterViewInit {
  @ViewChild('header', { read: ElementRef })
  header: ElementRef;
  iframeHeight: number = 0;

  constructor(private changeDetectionRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    const headerRect: any = this.header.nativeElement.getBoundingClientRect();
    this.iframeHeight = window.innerHeight - headerRect.height;

    this.changeDetectionRef.detectChanges();
  }
}
