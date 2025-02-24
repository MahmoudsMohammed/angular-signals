import { Component, inject } from '@angular/core';
import { MessagesService } from './messages.service';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  imports: [NgClass, MatIcon],
})
export class MessagesComponent {
  onClose() {}
}
