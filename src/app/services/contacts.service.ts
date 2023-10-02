import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacts } from '../models/contacts.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  public getContactInfo(): Observable<Contacts[]> {
    return this.http.get<Contacts[]>('contacts.json').pipe(
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

  public postContactInfo(newInfo: Contacts) {
    return this.http.post('contacts.json', newInfo, {
      params: new HttpParams().set('auth', sessionStorage.getItem('token')),
    });
  }

  public putContactInfo(editedInfo: Contacts) {
    return this.http.put(`contacts/${editedInfo.id}.json`, editedInfo, {
      params: new HttpParams().set('auth', sessionStorage.getItem('token')),
    });
  }

  public deleteContactInfo(deletedInfo: Contacts) {
    return this.http.delete(`contacts/${deletedInfo.id}.json`, {
      params: new HttpParams().set('auth', sessionStorage.getItem('token')),
    });
  }
}
