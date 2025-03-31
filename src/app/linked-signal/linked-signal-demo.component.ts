import { Component, effect, linkedSignal, signal } from '@angular/core';
import { testCourse } from '../models/course.model';

@Component({
  selector: 'linked-signal-demo',
  templateUrl: './linked-signal-demo.component.html',
  styleUrl: './linked-signal-demo.component.scss',
})
export class LinkedSignalDemoComponent {
  courses: testCourse[] = [
    {
      code: 'BEGINNERS',
      title: 'Angular for Beginners',
      defaultQuantity: 10,
    },
    {
      code: 'SIGNALS',
      title: 'Angular Signals In Depth',
      defaultQuantity: 20,
    },
    {
      code: 'SSR',
      title: 'Angular SSR In Depth',
      defaultQuantity: 30,
    },
  ];

  selectedCourse = signal<string | null>('BEGINNERS');

  quantity = signal<number>(0);

  constructor() {
    effect(() => {
      const quantity = this.courses.find(
        (course: testCourse) => course.code === this.selectedCourse()
      )?.defaultQuantity;
      this.quantity.set(quantity || 0);
    });
  }

  onQuantityChanged(quantity: string) {
    this.quantity.set(parseInt(quantity));
  }

  onArticleAdded() {
    alert(`${this.quantity()} licenses added for ${this.selectedCourse()}`);
  }

  onCourseSelected(courseCode: string) {
    this.selectedCourse.set(courseCode);
  }
}
