import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LessonsComponent } from './lessons/lessons.component';
import { ResourceDemoComponent } from './resource-demo/resource-demo.component';
import { LinkedSignalDemoComponent } from './linked-signal/linked-signal-demo.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { authGuard } from './services/auth.guard';
import { CourseComponent } from './course/course.component';
import { courseDataResolver } from './constants/course-data.resolver';
import { lessonsDataResolver } from './constants/lessons-data.resolver';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'view/:id',
    component: CourseComponent,
    canActivate: [authGuard],
    resolve: {
      course: courseDataResolver,
      lessons: lessonsDataResolver,
    },
  },
  {
    path: 'lessons',
    component: LessonsComponent,
  },
  {
    path: 'shopping-cart',
    component: LinkedSignalDemoComponent,
  },
  {
    path: 'resource-demo',
    component: ResourceDemoComponent,
  },
  {
    path: 'documentation',
    component: DocumentationComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
