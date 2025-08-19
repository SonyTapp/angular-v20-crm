import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: true,
  imports: [RouterModule]
})
export class SidebarComponent {
  // Optional: menu items as array for easy expansion
  menuItems = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Clients', route: '/customers' },
    { name: 'Interactions', route: '/interactions' },
    { name: 'Tasks', route: '/tasks' },
    { name: 'Activity', route: '/messages' }
  ];
}





