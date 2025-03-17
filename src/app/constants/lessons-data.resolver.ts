import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LessonsService } from '../services/lessons.service';
import { Lesson } from '../models/lesson.model';

export const lessonsDataResolver: ResolveFn<Lesson[] | null> = (
  route,
  state
) => {
  const courseId = route.paramMap.get('id'),
    _lessonsServices = inject(LessonsService);
  if (courseId) {
    return _lessonsServices.getLessons({ courseId });
  } else {
    return null;
  }
};
