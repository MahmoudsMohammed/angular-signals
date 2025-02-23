import { LoadingService } from './../loading/loading.service';
import {
  Component,
  computed,
  effect,
  inject,
  Injector,
  OnInit,
  signal,
} from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';
import { catchError, from, throwError } from 'rxjs';
import {
  toObservable,
  toSignal,
  outputToObservable,
  outputFromObservable,
} from '@angular/core/rxjs-interop';
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';
import { openDialog } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'home',
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // coursesFetchService = inject(CoursesServiceWithFetch);
  coursesService = inject(CoursesService);
  dialog = inject(MatDialog);
  courses = signal<Course[]>([]);
  beginnerCourses = computed(() => {
    return this.courses().filter((course) => course.category === 'BEGINNER');
  });
  advancedCourses = computed(() => {
    return this.courses().filter((course) => course.category === 'ADVANCED');
  });

  constructor() {}

  ngOnInit(): void {
    this.getAllCourses();
  }
  async getAllCourses() {
    const courses = await this.coursesService.getAllCourses();
    this.courses.set(courses.sort(sortCoursesBySeqNo));
  }

  onCoursesUpdated($event: Course) {
    const newCourses = this.courses().map((course) =>
      course.id === $event.id ? $event : course
    );
    this.courses.set(newCourses);
  }

  // call delete courses API which return a promise & wait for it's body
  // can handle error with a try catch block
  async onDeleteCourse($event: string) {
    const data = await this.coursesService.deleteCourse($event);
    this.deleteCourse(data.id);
  }

  // reflect the change on UI without call get all courses API
  deleteCourse(id: string) {
    const newCourses = this.courses().filter((course) => course.id != id);
    this.courses.set(newCourses);
  }

  // open dialog to add a new course
  async onAddCourse() {
    const course = await openDialog(this.dialog, {
      mode: 'create',
      title: 'Add a new Course',
    });
    console.log(course);
    this.addNewCourse(course);
  }

  addNewCourse(course: Course) {
    const courses = [...this.courses(), course];
    this.courses.set(courses);
  }
}
