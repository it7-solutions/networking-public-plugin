import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import * as _ from 'underscore';

import { PluginConfig } from "../../services/plugin.config";
import { Participant } from "../../models/participant";
import { ParticipantsService } from '../../services/participants.service';
import { ParticipantsListItemComponent } from './participants-list-item.component';
import { ParticipantsListHeaderComponent } from './participants-list-header.component';

@Component({
    selector: 'participants-list',
    templateUrl: '/app/templates/participants-list.html',
    directives: [ParticipantsListItemComponent, ParticipantsListHeaderComponent]
})
export class ParticipantsListComponent {
    @Input() list: Participant[];

    private sortBy: string;
    private sortDesc: boolean;
    private perPage: number;

    odd: boolean;
    reverse: boolean;
    showed: number;


    constructor(
        private config: PluginConfig,
        private participants: ParticipantsService
    ) {
        this.sortBy = config.participantsSortBy;
        this.sortDesc = config.participantsSortDesc;
        this.perPage = config.participantsPerPage;

        this.list = [];

        this.odd = false;
        this.reverse = false;
        this.showed = 10;
    }

    ngOnInit() {
        this.participants.onUpdate.subscribe(participants => this.updateList(participants));
        console.log('onUpdate.subscribe');
        this.resetVisible();
    }

    onSortClick(){
        this.setSorting('registration_id', true);
    }

    private setSorting(fieldName: string, descending: boolean){
        this.sortBy = fieldName.toString();
        this.sortDesc = !!descending;
        //++ Установить настройки сортировки
        this.sort();
    }

    private sort(){
        var reverse = this.reverse;
        this.list.sort(function(p1:Participant, p2:Participant){
            return !reverse ? p1.registration_id - p2.registration_id : p2.registration_id - p1.registration_id;
        });
    }

    // Call from this class closure
    updateList(participants: Participant[]){
        this.list = participants;
        this.sort();
        this.filter();
        this.setVisible();
        console.log('updateList',this.list.length);
    }






    add(){
        this.showed += 10;
        this.setVisible();
    }

    up(){
        this.list = _.map(_.range(400), function(n){
            return {
                company: "[Company for " + n + ']',
                email: '[' + n + "@co.com]",
                fname: '[' + n + "man]",
                lname: "[family of " + n+ ']',
                registration_id: n,
                _hidden: false,
                _filteredOut: false
            }
        });
        this.sort();
        this.filter();
        this.setVisible()
    }

    tt(){
        _.each(this.list, function(p:Participant, i:number) {
            p.registration_id == 30 && (p.fname = '3030');
        })
    }


    refilter(){
        this.odd = !this.odd;
        this.filter();
        this.resetVisible();
    }

    private filter(){
        var odd = this.odd? 0 : 1;
        _.each(this.list, function(p:Participant) {
            p._filteredOut = p.registration_id%2 == odd;
        })
    }

    private resetVisible(){
        this.showed = 10;
        this.setVisible();
    }

    private setVisible(){
        var i = 0;
        let max = this.showed;
        _.each(this.list, function(p:Participant) {
            if(!p._filteredOut && i < max) {
                p._hidden = false;
                i++;
            } else {
                p._hidden = true;
            }
        })
    }

    resort() {
        this.reverse = !this.reverse;
        this.sort();
        this.resetVisible();
    }
}
