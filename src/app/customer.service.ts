import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Customer } from './customer';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class CustomerService {

  private customersUrl = 'api/customers';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET customers from the server */
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
      .pipe(
        // tap(_ => this.log('fetched customers')),
        catchError(this.handleError<Customer[]>('getCustomers', []))
      );
  }

  /** GET customer by id. Return `undefined` when id not found */
  getCustomerNo404<Data>(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/?id=${id}`;
    return this.http.get<Customer[]>(url)
      .pipe(
        map(customers => customers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} customer id=${id}`);
        }),
        catchError(this.handleError<Customer>(`getCustomer id=${id}`))
      );
  }

  /** GET customer by id. Will 404 if id not found */
  getCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      // tap(customer => this.log(`Opened Customer Editor: ${customer.name}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }

  /* GET customers whose name contains search term */
  searchCustomers(term: string): Observable<Customer[]> {
    if (!term.trim()) {
      // if not search term, return empty customer array.
      return of([]);
    }
    return this.http.get<Customer[]>(`${this.customersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`Found customers matching "${term}"`) :
         this.log(`No customers matching "${term}"`)),
      catchError(this.handleError<Customer[]>('searchCustomers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new customer to the server */
addCustomer(customer: Customer): Observable<Customer> {
  return this.http.post<Customer>(this.customersUrl, customer, this.httpOptions).pipe(
    tap((newCustomer: Customer) => this.log(`Added Customer: ${newCustomer.name}`)),
    catchError(this.handleError<Customer>('addCustomer'))
  );
}

deleteCustomer(id: number, name: string): Observable<Customer> {  // pass the name too
  const url = `${this.customersUrl}/${id}`;

  return this.http.delete<Customer>(url, this.httpOptions).pipe(
    tap(_ => this.log(`Deleted Customer: ${name}`)),
    catchError(this.handleError<Customer>('deleteCustomer'))
  );
}

updateCustomer(customer: Customer): Observable<any> {
  return this.http.put(this.customersUrl, customer, this.httpOptions).pipe(
    tap(_ => this.log(`Updated Customer: ${customer.name}`)),
    catchError(this.handleError<any>('updateCustomer'))
  );
}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a CustomerService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`CustomerService: ${message}`);
    this.messageService.add(message);
  }

/** GET total number of customers */
getTotalClients(): Observable<number> {
  return this.getCustomers().pipe(
    map(customers => customers.length) // count all customers
  );
}

/** GET number of active customers */
getActiveClients(): Observable<number> {
  return this.getCustomers().pipe(
    map(customers => customers.filter(c => c.status === 'Active').length) // count only active
  );
}

getLeadClients(): Observable<number> {
  return this.getCustomers().pipe(
    map(customers => customers.filter(c => c.status === 'Prospect').length) // count only active
  );
}

/** GET client FOR PIE CHART */
getClientStats(): Observable<{ total: number; active: number; leads: number }> {
  return this.getCustomers().pipe(
    map(customers => {
      const total = customers.length;
      const active = customers.filter(c => c.status === 'Active').length;
      const leads = customers.filter(c => c.status === 'Prospect').length;
      return { total, active, leads };
    })
  );
}





}