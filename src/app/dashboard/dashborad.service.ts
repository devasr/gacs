import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Helper} from '../helper'
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';
@Injectable()
export class DashboardService {
    baseUrl = Helper.baseURL;
    headers: any;
    options: any;
    constructor(private http: Http) {
      this.headers = new Headers({ 'Content-Type': 'text/plain'});
      this.options = new RequestOptions({ headers: this.headers });
    }
    // getCouncilData(jasonData) {
    //     return this.http.post(this.baseUrl, jasonData, this.options).map((res: Response) => res.json());
    // }

    // getOfficeBearer(jasonData) {
    //     return this.http.post(this.baseUrl, jasonData, this.options).map((res: Response) => res.json());
    // };
    // getNews(jasonData) {
    //     return this.http.post(this.baseUrl, jasonData, this.options).map((res: Response) => res.json());
    // };

    apicall(jasonData) {
        return this.http.post(this.baseUrl, jasonData, this.options).map((res: Response) => res.json());
    }
}
