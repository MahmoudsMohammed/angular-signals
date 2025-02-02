import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'test',
  imports: [MatButtonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  counter = signal<number>(0);

  onIncrement() {
    this.counter.update((value) => value + 1);
  }

  onDecrement() {
    this.counter.update((value) => value - 1);
  }
}
