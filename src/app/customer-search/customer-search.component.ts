import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: [ './customer-search.component.css' ],
  standalone: true,
  imports: [CommonModule, RouterModule]

})
export class CustomerSearchComponent implements OnInit {
  customers$!: Observable<Customer[]>;
  private searchTerms = new Subject<string>();

  constructor(private customerService: CustomerService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.customers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.customerService.searchCustomers(term)),
    );
  }
}