import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment} from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
@Injectable()
export class HomePageService {
    baseUrl = environment.baseURL;
    headers:any;
    options:any
    constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'text/plain'});
     this.options = new RequestOptions({ headers: this.headers });

    }
    apicall(jasonData) {
        return this.http.post(this.baseUrl, jasonData, this.options).map((res: Response) => res.json());
    }

}
