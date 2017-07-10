import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { API_BASE_URL } from './constants';

@Injectable()

export class DashboardService {

  constructor(private http: Http) { }

  // getTrend(): Observable<any[]> {
  //     return this.http.get(`${API_BASE_URL}/api/trend`)
  //         .map(res => res.json() || [])
  //         .catch(error => {
  //           console.log(error);
  //           return Observable.of([]);
  //         });
  // }

  getTrend(): Promise<any> {
    return this._getJSON(`${API_BASE_URL}/api/trend`);
  }

  getPosition(): Promise<any> {
    return this._getJSON(`${API_BASE_URL}/api/position`);
  }
  getGroupHireDetail(): Promise<any> {
    return this._getJSON(`${API_BASE_URL}/api/group_detail`);
  }

  _getJSON(url: string): Promise<any> {
    return this.http.get(url)
      .toPromise()
      .then(res => {
        return res.json() || {}
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error.message || error);
      });
  }
}
