import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
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
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationComponent implements OnInit {
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
  counterEffect = signal<number>(0);
  effectStatement: string = '10 Effect Happen';

  injectionContext = inject(Injector);

  constructor() {}

  makeEffect() {
    effect(
      () => {
        this.effectStatement = this.counterEffect() + ' Effect Happen';
        console.log('Effect Counter Value Is => ', this.counterEffect());
        this.counterTwo.update((value) => ++value);
      },
      {
        // to define the injection context for the effect so auto destroy when this
        // context destroyed so avoid the memory leak
        injector: this.injectionContext,
      }
    );
  }

  ngOnInit(): void {
    this.makeEffect();
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

  onIncrementEffect() {
    this.counterEffect.update((value) => ++value);
  }
}
