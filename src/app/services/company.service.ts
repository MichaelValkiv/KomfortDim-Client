import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  public getCompanyInfo() {
    return this.http.get('company.json').pipe(
      map((responseData) => {
        const data = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            data.push({ ...responseData[key], id: key });
          }
        }
        return data;
      })
    );
  }

  public postCompanyInfo(newInfo: Company) {
    return this.http.post('company.json', newInfo, {
      params: new HttpParams().set('auth', sessionStorage.getItem('token')),
    });
  }

  public putCompanyInfo(editedInfo: Company) {
    return this.http.put(`company/${editedInfo.id}.json`, editedInfo, {
      params: new HttpParams().set('auth', sessionStorage.getItem('token')),
    });
  }

  public deleteCompanyInfo(deletedInfo: Company) {
    return this.http.delete(`company/${deletedInfo.id}.json`, {
      params: new HttpParams().set('auth', sessionStorage.getItem('token')),
    });
  }
}
