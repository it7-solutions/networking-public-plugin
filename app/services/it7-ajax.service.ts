import {Injectable} from "@angular/core";
import {Headers, Http, Response, ResponseOptions, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
//import {MockBackend} from "@angular/http/testing";

import {It7ErrorService} from "./it7-error.service";
import {PluginConfig} from "./plugin.config";

interface It7AjaxResponse {
    error: number
    errorMessage: string
    data: any
}

@Injectable()
export class It7AjaxService {

    constructor(
        private http: Http,
        private err: It7ErrorService,
        private config:PluginConfig
//        private backend: MockBackend
    ) {
        // this.backend.connections.subscribe((c:any) => {
        //     console.log('ccc');
        //     console.log(c);
        //     let singleTicketMatcher = /\/api\/ticket\/([0-9]+)/i;
        //
        //     // return all tickets
        //     // GET: /ticket
        //     if (c.request.url === "http://localhost:8080/api/ticket" && c.request.method === 0) {
        //         // let res = new Response({
        //         //     body: JSON.stringify({}),
        //         //     status: 0
        //         // });
        //
        //         //c.mockRespond(res);
        //         c.mockRespond(new Response(new ResponseOptions({ body: 'fake response' })));
        //     }
        // });
    }

    post(url: string, data: any): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        console.log('send.');
        if(this.config.mockAJAX){return Promise.resolve(this.getMockData(url));}

        return this.http
            .post(url, JSON.stringify(data), options)
            //.get(url)
            .toPromise()
            .then(res => this.checkResponse(res))
            .catch(this.handleError);

    }

    private checkResponse(res:Response): any{
        console.log('checkResponse');
        return res.json().data;
    }

    private handleError(error: any) {
        console.log('!!!!');
        console.log(this);
        alert('Server connection error: ' + error);
        console.error('An error occurred', error);
        this.err.fire('Server connection error: ' + error);
        return Promise.reject(error.message || error);
    }

    private getMockData(mod: string = ''):any {
        var areas = ['relax','golf','rock','diving','dream','movie'];
        var m = {
            participant: _.map(_.range(700), function(n){

                return {
                    company: mod + "Company for " + n,
                    email: n + "@co.com",
                    fname: n + (Math.random()>0.5 ? "man" : 'girl'),
                    lname: "family of " + n,
                    language: Math.random()>0.5 ? 'ua-ua' : 'ca-fr',
                    area_of_expertise: _.filter(areas,function(){return Math.random()>0.5}),
                    registration_id: n
                }
            }),
            request: [
                {
                    'id': 1,
                    'registration_id': 10,
                    'requested_id': 11,
                    'status': 'pending',
                    'message': 'I\'m 10. You - 11. Please...'
                },
                {
                    'id': 2,
                    'registration_id': 12,
                    'requested_id': 10,
                    'status': 'pending',
                    'message': 'I\'m 12. You - 10. Please...'
                },
                {
                    'id': 3,
                    'registration_id': 13,
                    'requested_id': 10,
                    'status': 'accepted',
                    'message': 'I\'m 12. You - 10. Please...'
                },
                {
                    'id': 4,
                    'registration_id': 10,
                    'requested_id': 14,
                    'status': 'accepted',
                    'message': 'I\'m 10. You - 14. Please...'
                }
            ],
            connections: [
                {
                    'id': 1,
                    'request_id': 3,
                    'registration_id': 13,
                    'requested_id': 10,
                    'status': 'unknown'
                },
                {
                    'id': 2,
                    'request_id': 4,
                    'registration_id': 10,
                    'requested_id': 14,
                    'status': 'unknown'
                }
            ]
        };
        console.log('mockData');
        console.log(JSON.stringify(m));
        return m;
    }
}