import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Services } from '../models/services.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  public getServiceInfo(): Observable<Services[]> {
    return this.http.get<Services[]>('services.json').pipe(
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

  public postServiceInfo(newInfo: Services) {
    return this.http.post('services.json', newInfo, {
      params: new HttpParams().set('auth', sessionStorage.getItem('token')),
    });
  }

  public putServiceInfo(editedInfo: Services) {
    return this.http.put(`services/${editedInfo.id}.json`, editedInfo, {
      params: new HttpParams().set('auth', sessionStorage.getItem('token')),
    });
  }

  public deleteServiceInfo(deletedInfo: Services) {
    return this.http.delete(`services/${deletedInfo.id}.json`, {
      params: new HttpParams().set('auth', sessionStorage.getItem('token')),
    });
  }
}
