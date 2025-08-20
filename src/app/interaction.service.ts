import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Interaction } from './interaction';
import { Customer } from './customer';

@Injectable({ providedIn: 'root' })
export class InteractionService {
  private interactionsUrl = 'api/interactions';
  private customersUrl = 'api/customers';

  constructor(private http: HttpClient) {}

  getAllInteractions(): Observable<Interaction[]> {
    // fetch both interactions and customers
    return forkJoin({
      interactions: this.http.get<Interaction[]>(this.interactionsUrl),
      customers: this.http.get<Customer[]>(this.customersUrl)
    }).pipe(
      map(({ interactions, customers }) =>
        interactions.map(interaction => {
          const customer = customers.find(c => c.id === interaction.customerId);
          return {
            ...interaction,
            customerName: customer ? customer.name : 'Unknown'
          };
        })
      )
    );
  }

  updateInteraction(interaction: Interaction): Observable<any> {
    return this.http.put(`${this.interactionsUrl}/${interaction.id}`, interaction);
  }

  deleteInteraction(id: number): Observable<any> {
    return this.http.delete(`${this.interactionsUrl}/${id}`);
  }

  addInteraction(interaction: Interaction): Observable<Interaction> {
  return this.http.post<Interaction>(this.interactionsUrl, interaction);
}

}
