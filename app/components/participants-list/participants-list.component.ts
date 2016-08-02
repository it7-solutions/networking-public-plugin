import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import * as _ from 'underscore';

import { PluginConfig } from "../../services/plugin.config";
import {TranslationPipe} from "../../pipes/translation.pipe";
import {TranslationsService} from "../../services/translations.service";
import { Participant } from "../../models/participant";
import { ParticipantsService } from '../../services/participants.service';
import { ParticipantsListItemComponent } from './participants-list-item.component';
import { ParticipantsListHeaderComponent } from './participants-list-header.component';
import {Filter} from "../../models/filter";

@Component({
    selector: 'participants-list',
    templateUrl: '/app/templates/participants-list.html',
    directives: [ParticipantsListItemComponent, ParticipantsListHeaderComponent],
    pipes: [TranslationPipe]
})
export class ParticipantsListComponent {
    @Input() list: Participant[];

    recordsFound: number;
    recordsShow: number;

    private sortBy: string;
    private sortDesc: boolean;
    private visibleStep:number;
    private searchField:string;

    private keywords:string;
    private filters:Filter[];

    private visible:number;

    constructor(
        private config: PluginConfig,
        public t:TranslationsService,
        private participants: ParticipantsService
    ) {
        this.sortBy = config.participantsSortBy;
        this.sortDesc = config.participantsSortDesc;
        this.visibleStep = config.participantsPerPage;
        this.searchField = config.searchField;

        this.keywords = '';
        this.filters = [];

        this.visible = this.visibleStep;

        this.list = [];
        this.recordsFound = 0;
        this.recordsShow = 0;
    }

    ngOnInit() {
        this.participants.onUpdate.subscribe(participants => this.updateList(participants));
        console.log('onUpdate.subscribe');
        this.resetVisible();
    }

    // Call from this class closure
    updateList(participants: Participant[]){
        this.list = participants;
        this.sort();
        this.filter();
        this.setVisible();
        console.log('updateList',this.list.length);
    }

    setSorting(fieldName: string, descending: boolean = false){
        this.sortBy = fieldName.toString();
        this.sortDesc = !!descending;
        //++ Установить настройки сортировки
        this.sort();
        this.resetVisible();
    }

    private sort(){
        var sortBy = this.sortBy;
        var sortDesc = this.sortDesc;
        this.list.sort(function(p1:Participant, p2:Participant){
            //return !reverse ? p1.registration_id - p2.registration_id : p2.registration_id - p1.registration_id;
            var v1 = sortDesc ? p2[sortBy] : p1[sortBy];
            var v2 = sortDesc ? p1[sortBy] : p2[sortBy];
            return v1.localeCompare(v2);
        });
    }

    setFilters(keywords: string, filters: Filter[]){
        this.keywords = keywords;
        this.filters = this.prepareFilters(filters);
        this.filter();
        this.resetVisible();
    }

    private filter() {
        var filters = this.filters;
        var keywords = this.keywords;
        var searchField = this.searchField;

        console.log(filters);
        _.each(this.list, function(p:Participant) {
            var isPass = true;

            var searchValue = p[searchField];
            keywords && (isPass = searchValue !== undefined && searchValue.indexOf(keywords) !== -1);

            isPass && _.each(filters, function (filter:Filter) {
                var value = p[filter.field];
                if (value === undefined) {
                    isPass = false;
                    return;
                }
                if(filter.multi) {
                    var satisfyCount = _.filter(filter.value, function(v:any){
                        return value.indexOf(v) !== -1;
                    }).length;
                    satisfyCount !== filter.value.length && (isPass = false);
                } else {
                    value !== filter.value && (isPass = false);
                }
            });
            p._filteredOut = !isPass;
        })
    }


    private prepareFilters(filters:Filter[]):Filter[] {
        return _.filter(filters, function (f:Filter) {
            f.multi = _.isArray(f.value);

            return !(f.multi ? f.value.length === 0 : (f.value === '' || f.value === undefined));
        });
    }

    showMoreRecords(){
        this.visible += this.visibleStep;
        this.setVisible();
    }

    private setVisible(){
        let max = this.visible;
        var found = 0;
        var show = 0;
        _.each(this.list, function(p:Participant) {
            p._filteredOut || found++;
            if(!p._filteredOut && show < max) {
                p._hidden = false;
                show++;
            } else {
                p._hidden = true;
            }
        });
        this.recordsFound = found;
        this.recordsShow = show;
    }

    private resetVisible() {
        this.visible = this.visibleStep;
        this.setVisible();
    }
}
