import { Component, inject, OnInit, signal } from '@angular/core';
import { Course } from '../models/course.model';
import { GetLessonsResponse } from '../models/get-lessons.response';
import { Lesson } from '../models/lesson.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
  course = signal<Course | null>(null);
  lessens = signal<Lesson[]>([]);
  _actRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.course.set(this._actRoute.snapshot.data['course']);
    console.log('Course Details ====>', this.course());
  }
}
