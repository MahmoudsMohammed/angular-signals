import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesServiceWithFetch {
  env = environment as any;

  async getAllCourses(): Promise<Course[]> {
    const request = await fetch(`${this.env.apiRoot}/courses`);
    const courses = await request.json();
    return courses.courses;
  }
}
