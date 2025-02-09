import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, firstValueFrom, map, tap, throwError } from 'rxjs';
import { Course } from '../models/course.model';
import { GetCoursesResponse } from '../models/get-courses.response';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  env = environment as any;
  http = inject(HttpClient);
  async getAllCourses(): Promise<Course[]> {
    const courses$ = this.http
      .get<GetCoursesResponse>(`${this.env.apiRoot}/courses`)
      .pipe(
        tap((data) => console.log(data)),
        map((data: GetCoursesResponse) => data.courses),
        tap((data) => console.log(data)),
        catchError((err) => {
          alert('There Is Some Error Please Try Later ;)');
          return throwError(() => err);
        })
      );

    const courses = await firstValueFrom(courses$);

    return courses;
  }
}
