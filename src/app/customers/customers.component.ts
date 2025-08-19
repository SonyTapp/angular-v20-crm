import { Component, OnInit } from '@angular/core';

import { Customer } from '../customer';
import { CustomerService } from '../customer.service';


import { RouterModule } from '@angular/router';

import { AddClientComponent } from '../add-client/add-client.component';
import { CustomerDisplayComponent } from '../customer-display/customer-display.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  standalone: true,
  imports: [RouterModule, AddClientComponent, CustomerDisplayComponent]

})



export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  // Added property to control showing/hiding the AddClient form
  showAddClient = false;

  selectedCustomer?: Customer; 

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers()
    .subscribe(customers => this.customers = customers);
  }

  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.customerService.addCustomer({ name } as Customer)
    .subscribe(customer => {
      this.customers.push(customer);
    });
}

delete(customer: Customer): void {
  this.customers = this.customers.filter(h => h !== customer);
  this.customerService.deleteCustomer(customer.id, customer.name).subscribe();
}

selectCustomer(customer: Customer): void {
  // toggle: if already selected, close it; otherwise open it
  this.selectedCustomer = this.selectedCustomer === customer ? undefined : customer;
}
}

