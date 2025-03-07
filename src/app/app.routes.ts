import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LessonsComponent } from './lessons/lessons.component';
import { ResourceDemoComponent } from './resource-demo/resource-demo.component';
import { LinkedSignalDemoComponent } from './linked-signal/linked-signal-demo.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { authGuard } from './services/auth.guard';

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
