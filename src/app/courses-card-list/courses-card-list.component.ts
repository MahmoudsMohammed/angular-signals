import { Component, effect, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { openDialog } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'courses-card-list',
  imports: [RouterLink, MatIcon],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss',
})
export class CoursesCardListComponent {
  courses = input<Course[]>([], {
    alias: 'data',
  });
  dialog = inject(MatDialog);
  updatedCourse = output<Course>();
  constructor() {
    effect(() => {
      console.log(this.courses());
    });
  }

  async onEdit(course: Course) {
    const data = await openDialog(this.dialog, {
      mode: 'update',
      title: 'Update The Course',
      course: course,
    });
    this.updatedCourse.emit(data);
  }
}

// Transform Function to Transform from the courses array to course title array
function getCourseTitle(courses: Course[]) {
  return courses.map((course) => course.title);
}
