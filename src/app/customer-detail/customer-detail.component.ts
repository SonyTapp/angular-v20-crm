import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { FormsModule } from '@angular/forms';


import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: [ './customer-detail.component.css' ],
  standalone: true,
  imports: [FormsModule]

})
export class CustomerDetailComponent implements OnInit {
  customer: Customer | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location,
    private messageService: MessageService 
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.customerService.getCustomer(id)
      .subscribe(customer => this.customer = customer);
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
  if (this.customer) {
    this.customerService.updateCustomer(this.customer)
      .subscribe(() => this.goBack()); // no extra log here
  }
}
}



