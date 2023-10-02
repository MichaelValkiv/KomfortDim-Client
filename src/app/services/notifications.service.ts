import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notifications } from '../models/notifications.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  public getNotificationInfo() {
    return this.http.get('notifications.json').pipe(
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

  public postNotificationInfo(newInfo: Notifications) {
    return this.http.post('notifications.json', {
      ...newInfo,
      notification_date: Date.now(),
    });
  }

  public putNotificationInfo(editedInfo: Notifications) {
    return this.http.put(`notifications/${editedInfo.id}.json`, editedInfo);
  }

  public deleteNotificationInfo(deletedInfo: Notifications) {
    return this.http.delete(`/notifications/${deletedInfo.id}.json`);
  }
}
