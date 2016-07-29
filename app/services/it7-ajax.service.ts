import {Injectable} from "@angular/core";
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

interface It7AjaxResponse {
    error: number
    errorMessage: string
    data: any
}

@Injectable()
export class It7AjaxService {

    constructor(private http: Http) { }

    post(url: string, data: any): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/json'});

        return this.http
            .post(url, JSON.stringify(data), {headers: headers})
            .toPromise()
            .then(res => this.checkResponse(res))
            .catch(this.handleError);
    }

    private checkResponse(res:Response): any{
        return res.json().data;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}