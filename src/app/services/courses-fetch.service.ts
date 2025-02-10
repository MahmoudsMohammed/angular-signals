import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Course } from '../models/course.model';
import { json } from 'body-parser';

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

  async addNewCourse(course: Partial<Course>): Promise<Course> {
    // define headers and method in the fetch config Objec
    const request = await fetch(`${this.env.apiRoot}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });
    const data = await request.json();
    return data.courses;
  }

  async editCourse(id: string, changes: Partial<Course>): Promise<Course> {
    const request = await fetch(`${this.env.apiRoot}/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changes),
    });
    const data = await request.json();
    return data.courses;
  }

  async deleteCourse(id: string): Promise<any> {
    const request = await fetch(`${this.env.apiRoot}/courses/${id}`, {
      method: 'DELETE',
    });
    const data = await request.json();
    return data.courses;
  }
}
