import { Component, input, output } from '@angular/core';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'lessons-master',
  imports: [],
  templateUrl: './lessons-master.component.html',
  styleUrl: './lessons-master.component.scss',
})
export class LessonsMasterComponent {
  lessons = input.required<Lesson[]>();
  selectLesson = output<Lesson>();
}
