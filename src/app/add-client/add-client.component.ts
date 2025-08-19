

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
  standalone: true,
  imports: []
})
export class AddClientComponent {
  @Output() add = new EventEmitter<string>();

  addCustomer(name: string) {
    name = name.trim();
    if (!name) return;
    this.add.emit(name); // parent handles actual service call
  }
}

