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

@Component({
  selector: 'home',
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // coursesFetchService = inject(CoursesServiceWithFetch);
  coursesService = inject(CoursesService);
  courses = signal<Course[]>([]);
  beginnerCourses = computed(() => {
    return this.courses().filter((course) => course.category === 'BEGINNER');
  });
  advancedCourses = computed(() => {
    return this.courses().filter((course) => course.category === 'ADVANCED');
  });

  constructor() {
    effect(() => {
      console.log('The Courses Length Is =>', this.courses().length);
      console.log('Beginner =>', this.beginnerCourses());
      console.log('Advanced =>', this.advancedCourses());
    });
  }

  ngOnInit(): void {
    this.getAllCourses();
  }
  async getAllCourses() {
    const courses = await this.coursesService.getAllCourses();
    this.courses.set(courses);
  }
}
