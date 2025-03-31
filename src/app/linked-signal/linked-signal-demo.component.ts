import {
  Component,
  computed,
  effect,
  input,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { testCourse } from '../models/course.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

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

  test = signal<number>(2);

  selectedCourse = signal<string | null>('BEGINNERS');

  quantity = linkedSignal<{ code: string | null; test: number }, number>({
    source: () => ({ code: this.selectedCourse(), test: this.test() }),
    computation: (source, previous) => {
      console.log('previous ===> ', previous);
      return (
        this.courses.find((course) => course.code === source?.code)
          ?.defaultQuantity || 0
      );
    },
  });

  onQuantityChanged(quantity: string) {
    this.quantity.set(+quantity);
  }

  onArticleAdded() {
    alert(`${this.quantity()} licenses added for ${this.selectedCourse()}`);
  }

  onCourseSelected(courseCode: string) {
    this.selectedCourse.set(courseCode);
  }
}
