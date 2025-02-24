import { Component, effect, EffectRef, inject, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  imports: [MatIcon],
})
export class MessagesComponent {
  messageService = inject(MessagesService);
  message = this.messageService.message;
  effectRef!: EffectRef;

  constructor() {
    this.effectRef = effect((cleanup) => {
      let timeoutRef = null;
      if (this.message()?.text) {
        timeoutRef = setTimeout(() => {
          this.messageService.resetMessage();
        }, 3000);
      }
      cleanup(() => {
        if (timeoutRef) {
          clearTimeout(timeoutRef);
        }
      });
    });
  }
  onClose() {
    this.messageService.resetMessage();
    this.effectRef.destroy();
  }
}
