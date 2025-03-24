import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { openDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { map, finalize, interval, tap } from 'rxjs';
import {
  outputFromObservable,
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';

@Component({
  selector: 'courses-card-list',
  imports: [RouterLink, MatIcon],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss',
})
export class CoursesCardListComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  courses = input<Course[]>([], {
    alias: 'data',
  });
  dialog = inject(MatDialog);
  updatedCourse = output<Course>();
  deleteCourse = output<string>();
  interval$ = interval(1000).pipe(
    tap((value: number) => console.log(value)),
    finalize(() => console.log('Course Card List Interval Destroyed'))
  );
  intervalEvent = outputFromObservable(this.interval$);

  ngOnInit(): void {}

  async onEdit(course: Course) {
    const data = await openDialog(this.dialog, {
      mode: 'update',
      title: 'Update The Course',
      course: course,
    });
    if (data) {
      this.updatedCourse.emit(data);
    }
  }

  onDelete(id: string) {
    this.deleteCourse.emit(id);
  }
}

// Transform Function to Transform from the courses array to course title array
function getCourseTitle(courses: Course[]) {
  return courses.map((course) => course.title);
}
