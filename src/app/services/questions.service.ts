import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questions } from '../models/questions.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  public getQuestionInfo() {
    return this.http.get('questions.json').pipe(
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

  public postQuestionInfo(newInfo: Questions) {
    return this.http.post('questions.json', {
      ...newInfo,
      question_date: Date.now(),
      answer_date: Date.now(),
    });
  }

  public putQuestionInfo(editedInfo: Questions) {
    return this.http.put(`questions/${editedInfo.id}.json`, editedInfo);
  }

  public deleteQuestionInfo(deletedInfo: Questions) {
    return this.http.delete(`questions/${deletedInfo.id}.json`);
  }
}
