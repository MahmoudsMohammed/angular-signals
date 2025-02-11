import { Component, effect, inject, OnInit, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Course } from '../models/course.model';
import { EditCourseDialogData } from './edit-course-dialog.data.model';
import { CoursesService } from '../services/courses.service';
import { LoadingIndicatorComponent } from '../loading/loading.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourseCategoryComboboxComponent } from '../course-category-combobox/course-category-combobox.component';
import { CourseCategory } from '../models/course-category.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent,
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss',
})
export class EditCourseDialogComponent implements OnInit {
  fb = inject(FormBuilder);
  dialog = inject(MatDialogRef);
  data: EditCourseDialogData = inject(MAT_DIALOG_DATA);
  courseForm!: FormGroup;

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      longDescription: ['', [Validators.required]],
      category: ['', [Validators.required]],
      iconUrl: ['', [Validators.required]],
    });
    // check for mode
    if (this.data.mode === 'update') {
      this.setInitialValue();
    }
  }

  setInitialValue() {
    this.courseForm.setValue({
      title: this.data.course?.title,
      longDescription: this.data.course?.longDescription,
      category: this.data.course?.category,
      iconUrl: this.data.course?.iconUrl,
    });
  }
}

export async function openDialog(
  dialog: MatDialog,
  data: EditCourseDialogData
) {
  const config = new MatDialogConfig();
  config.autoFocus = true;
  config.disableClose = true;
  config.width = '400px';
  config.data = data;
  const dialogRef = dialog.open(EditCourseDialogComponent, config);
  return firstValueFrom(dialogRef.afterClosed());
}
