import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-add-interact',
  standalone: true,
  imports: [CommonModule], // ✅ No FormsModule needed
  templateUrl: './add-interact.component.html',
  styleUrls: ['./add-interact.component.css']
})
export class AddInteractComponent implements OnInit {
  @Output() add = new EventEmitter<{ customerId: number; customerName: string; note: string }>();

  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  addInteraction(customerSelect: HTMLSelectElement, noteInput: HTMLInputElement) {
    const customerId = Number(customerSelect.value);
    const note = noteInput.value.trim();
    if (!note || !customerId) return;

    const customer = this.customers.find(c => c.id === customerId);
    if (!customer) return;

    this.add.emit({ customerId: customer.id, customerName: customer.name, note });

    // Clear inputs
    noteInput.value = '';
    customerSelect.value = '';
  }
}
