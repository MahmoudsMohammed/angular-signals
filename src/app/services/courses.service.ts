import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  catchError,
  delay,
  finalize,
  firstValueFrom,
  map,
  tap,
  throwError,
} from 'rxjs';
import { Course } from '../models/course.model';
import { GetCoursesResponse } from '../models/get-courses.response';
import { displayLoader } from '../constants/loading.httptokencontext';
import { MessagesService } from '../messages/messages.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  env = environment as any;
  http = inject(HttpClient);
  _messageService = inject(MessagesService);
  async getAllCourses(): Promise<Course[]> {
    const courses$ = this.http
      .get<GetCoursesResponse>(`${this.env.apiRoot}/courses`)
      .pipe(
        map((data: GetCoursesResponse) => data.courses),
        catchError((err) => {
          return throwError(() => err);
        })
      );

    const courses = await firstValueFrom(courses$);

    return courses;
  }

  async addNewCourse(course: Partial<Course>): Promise<Course> {
    // with http client no need to set content type or convert the body => json is default
    const request$ = this.http.post<Course>(
      `${this.env.apiRoot}/courses`,
      course
    );

    return firstValueFrom(request$);
  }

  async editCourse(id: string, changes: Partial<Course>): Promise<Course> {
    const request$ = this.http.put<Course>(
      `${this.env.apiRoot}/courses/${id}`,
      changes
    );
    return firstValueFrom(request$);
  }

  async deleteCourse(id: string): Promise<any> {
    const request$ = this.http.delete<Course>(
      `${this.env.apiRoot}/courses/${id}`,
      {
        context: new HttpContext().set(displayLoader, false),
      }
    );
    return firstValueFrom(request$);
  }
}
