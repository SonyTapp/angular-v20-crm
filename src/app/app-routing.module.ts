import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { InteractionsComponent } from './interactions/interactions.component';


export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: CustomerDetailComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'interactions', component: InteractionsComponent }  // ← new route
];


