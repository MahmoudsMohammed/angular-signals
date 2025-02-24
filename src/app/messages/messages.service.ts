import { Injectable, signal } from '@angular/core';
import { Message, MessageSeverity } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  #messageMember = signal<Message | null>(null);
  message = this.#messageMember.asReadonly();

  setMessage(message: string, type: MessageSeverity) {
    this.#messageMember.set({ text: message, severity: type });
  }
  resetMessage() {
    this.#messageMember.set(null);
  }
}
