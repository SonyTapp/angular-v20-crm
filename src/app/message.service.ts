import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    const timestamp = new Date().toLocaleTimeString(); // current time
    this.messages.push(`${timestamp}: ${message}`);
  }

  clear() {
    this.messages = [];
  }
}
