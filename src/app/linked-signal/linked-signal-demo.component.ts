import {
  Component,
  computed,
  effect,
  linkedSignal,
  signal,
} from '@angular/core';
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

  //  Test Equal

  activeUser = signal({ id: 123, name: 'Morgan', isAdmin: true });
  activeUserEditCopy = linkedSignal(() => this.activeUser(), {
    // Consider the user as the same if it's the same `id`.
    equal: (a, b) => a.id === b.id,
  });
  // Or, if separating `source` and `computation`
  // activeUserEditCopy = linkedSignal({
  //   source: activeUser,
  //   computation: (user) => user,
  //   equal: (a, b) => a.id === b.id,
  // });

  constructor() {
    effect(() => {
      console.log('Active User ===> ', this.activeUserEditCopy());
    });
  }

  onQuantityChanged(quantity: string) {
    this.quantity.set(+quantity);
  }

  onArticleAdded() {
    alert(`${this.quantity()} licenses added for ${this.selectedCourse()}`);
  }

  onCourseSelected(courseCode: string) {
    this.selectedCourse.set(courseCode);
  }

  onChange() {
    this.activeUser.set({ id: 123, name: 'Loool', isAdmin: true });
  }
}
