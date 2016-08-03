import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { TranslationPipe } from "../../pipes/translation.pipe";

@Component({
    selector: 'search-keywords',
    templateUrl: '/app/templates/keywords.html',
    pipes: [TranslationPipe]
})
export class KeywordsComponent {
    @Input() keywords: string;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    onKeywordChange($event: any) {
      this.notify.emit($event.target.value);
    }
}
