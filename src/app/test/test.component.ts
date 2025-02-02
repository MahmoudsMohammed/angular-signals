import { UpperCasePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
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
})
export class TestComponent implements OnInit {
  counter = signal<number>(0);
  dataForm!: FormGroup;
  userData = signal<userData>({ name: 'mahmoud', age: 25, gender: 'male' });
  userName = signal<string>('Mahmoud');

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
}
