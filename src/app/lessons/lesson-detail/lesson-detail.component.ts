import { Component, inject, input, output } from '@angular/core';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from '../../services/lessons.service';
import { MessagesService } from '../../messages/messages.service';

@Component({
  selector: 'lesson-detail',
  imports: [],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss',
})
export class LessonDetailComponent {
  _lessonService = inject(LessonsService);
  lesson = input.required<Lesson | null>();
  updateLesson = output<Lesson>();
  cancel = output();

  async onUpdateTitle(title: string) {
    const newLesson = await this._lessonService.updateLesson(
      this.lesson()!.id,
      {
        description: title,
      }
    );
    this.updateLesson.emit(newLesson);
  }
}
