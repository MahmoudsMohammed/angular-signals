import { ResolveFn } from '@angular/router';
import { Course } from '../models/course.model';
import { inject } from '@angular/core';
import { CoursesService } from '../services/courses.service';

export const courseDataResolver: ResolveFn<Course | null> = (route, state) => {
  const courseId = route.paramMap.get('id'),
    _courseService = inject(CoursesService);
  if (courseId) {
    return _courseService.getCourseData(courseId);
  } else {
    return null;
  }
};
