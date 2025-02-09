import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../models/course.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'courses-card-list',
  imports: [RouterLink],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss',
})
export class CoursesCardListComponent {
  courses = input([], {
    alias: 'data',
    transform: getCourseTitle,
  });
  coursesLength = computed(() => {
    return this.courses().length;
  });
  constructor() {
    effect(() => {
      console.log(this.courses());
      console.log('Courses Length Is => ', this.coursesLength());
    });
  }
}

function getCourseTitle(courses: Course[]) {
  return courses.map((course) => course.title);
}
