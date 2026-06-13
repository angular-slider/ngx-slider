import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-demos',
    templateUrl: './docs.component.html',
    styleUrls: ['./docs.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DocsComponent {
}
