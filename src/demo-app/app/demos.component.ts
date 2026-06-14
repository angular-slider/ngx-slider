import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-demos',
    templateUrl: './demos.component.html',
    styleUrls: ['./demos.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DemosComponent {
}
