import { Component, input, model } from '@angular/core';

@Component({
  selector: 'course-categories',
  imports: [],
  templateUrl: './course-categories.component.html',
  styleUrl: './course-categories.component.scss',
})
export class CourseCategoriesComponent {
  label = input.required<string>();
  category = model.required<string>({ alias: 'cat' });

  onCategoryChange(e: Event) {
    this.category.set((e.target as HTMLSelectElement).value);
  }
}
