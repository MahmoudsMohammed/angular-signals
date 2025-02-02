import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

type userData = {
  name: string;
  age: number;
  gender: string;
};

@Component({
  selector: 'test',
  imports: [MatButtonModule, ReactiveFormsModule, UpperCasePipe],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent implements OnInit {
  counter = signal<number>(0);
  dataForm!: FormGroup;
  userData = signal<userData>({ name: 'mahmoud', age: 25, gender: 'male' });
  userName = signal<string>('Mahmoud').asReadonly();
  sequence = signal<number[]>([0]);
  counterTwo = signal<number>(0);
  counterTwo10x = computed(() => {
    return this.counterTwo() * 10;
  });
  counterTwo100x = computed(() => {
    return this.counterTwo10x() * 10;
  });

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      age: new FormControl(0, [
        Validators.required,
        Validators.min(20),
        Validators.max(40),
      ]),
      gender: new FormControl(null, Validators.required),
    });
  }
  onIncrement() {
    this.counter.update((value) => value + 1);
  }

  onDecrement() {
    this.counter.update((value) => value - 1);
  }

  onSaveData() {
    this.userData.set(this.dataForm.value);
  }

  onUpdateName(e: HTMLInputElement) {
    // error => because it's a read only signal
    // this.userName.set(e.value);
  }

  onIncrementSequence() {
    // every time emit a new array with new reference to make angular detect that a new value emitted
    // avoid mutation use signal value as immutable will not work with onPush
    this.sequence.update((value) => {
      const addedValue = value[value.length - 1] + 1;
      console.log(addedValue);
      value.push(addedValue);
      return value;
    });
  }

  onIncrementCounterTwo() {
    this.counterTwo.update((value) => value + 1);
  }
}
