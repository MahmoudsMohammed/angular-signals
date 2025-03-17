import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { Lesson } from '../models/lesson.model';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonsMasterComponent } from './lessons-master/lessons-master.component';

@Component({
  selector: 'lessons',
  imports: [LessonDetailComponent, LessonsMasterComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss',
})
export class LessonsComponent {
  // Inject Dependencies
  _lessonsService = inject(LessonsService);
  // Define The Members
  mode = signal<'master' | 'detail'>('master');
  lessons = signal<Lesson[]>([]);
  @ViewChild('lesson') lessonDecorator!: ElementRef;
  lessonSignal = viewChild.required<ElementRef>('lesson');
  searchQuery = signal<string>('');
  selectedLesson = signal<Lesson | null>(null);

  async onSearch() {
    let lessons = await this._lessonsService.getLessons({
      query: this.searchQuery(),
    });
    this.lessons.set(lessons);
  }
}
