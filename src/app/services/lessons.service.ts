import { inject, Injectable } from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { GetLessonsResponse } from '../models/get-lessons.response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  env = environment;
  _http = inject(HttpClient);

  async getLessons(body: {
    courseId?: string;
    query?: string;
  }): Promise<Lesson[]> {
    let params = new HttpParams();
    if (body.courseId) {
      params = params.set('courseId', body.courseId);
    }
    if (body.query) {
      params = params.set('query', body.query);
    }
    const request = this._http
      .get<GetLessonsResponse>(`${this.env.apiRoot}/search-lessons`, {
        params,
      })
      .pipe(map((data: GetLessonsResponse) => data.lessons));

    return firstValueFrom(request);
  }

  async updateLesson(lessonId: string, body: Partial<Lesson>): Promise<Lesson> {
    const request$ = this._http.put<Lesson>(
      `${this.env.apiRoot}/lessons/${lessonId}`,
      body
    );
    return firstValueFrom(request$);
  }
}
