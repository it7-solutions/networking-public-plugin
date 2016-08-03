import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

@Component({
    selector: 'search-keywords',
    templateUrl: '/app/templates/keywords.html'
})
export class KeywordsComponent {
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    onKeywordChange($event: any) {
      this.notify.emit($event.target.value);
    }
}
