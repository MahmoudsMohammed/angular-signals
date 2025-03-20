import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { Lesson } from '../models/lesson.model';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonsMasterComponent } from './lessons-master/lessons-master.component';
import {
  debounce,
  delay,
  filter,
  finalize,
  fromEvent,
  map,
  tap,
  throttle,
  timer,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lessons',
  imports: [LessonDetailComponent, LessonsMasterComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss',
})
export class LessonsComponent implements OnInit {
  // Inject Dependencies
  _lessonsService = inject(LessonsService);
  // Define The Members
  mode = signal<'master' | 'detail'>('master');
  lessons = signal<Lesson[]>([]);
  @ViewChild('lesson') lessonDecorator!: ElementRef;
  lessonSignal = viewChild.required<ElementRef>('lesson');
  searchQuery = signal<string>('');
  selectedLesson = signal<Lesson | null>(null);
  destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    // fire search request with keyup event & debounce
    // fromEvent(this.lessonSignal().nativeElement, 'keyup')
    //   .pipe(
    //     filter((e: any) => e.target && e.target?.value),
    //     map((e: any) => e.target?.value),
    //     debounce(() => timer(1000)),
    //     tap((data: string) => this.onSearchKeyUp(data)),
    //     takeUntilDestroyed(this.destroyRef),
    //     finalize(() => console.log('Key Up Observable Finish Subscription'))
    //   )
    //   .subscribe(console.log);
  }

  async onSearch() {
    let lessons = await this._lessonsService.getLessons({
      query: this.searchQuery(),
    });
    this.lessons.set(lessons);
  }

  async onSearchKeyUp(query: string) {
    let lessons = await this._lessonsService.getLessons({
      query: query,
    });
    this.lessons.set(lessons);
  }

  onUpdateLesson($event: Lesson) {
    return this.lessons.update((lessons) =>
      lessons.map((lesson) => (lesson.id === $event.id ? $event : lesson))
    );
  }
}
