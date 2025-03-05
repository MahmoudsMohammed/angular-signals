import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { LoadingIndicatorComponent } from './loading/loading.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatIcon,
    RouterLink,
    MatToolbar,
    MatIconButton,
    LoadingIndicatorComponent,
    MessagesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  _authService = inject(AuthService);
  isLogged = this._authService.isLoggedIn;
}
