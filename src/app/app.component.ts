import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    SidebarComponent,
    CustomerSearchComponent,
    RouterModule  // Needed for <router-outlet>
  ]
})
export class AppComponent {
  title = 'Customer Management System';
}
