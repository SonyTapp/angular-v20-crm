import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [PieChartComponent]  // import our raw Chart.js pie chart
})
export class DashboardComponent implements OnInit {
  totalClients = 0;
  activeClients = 0;
  leadClients = 0;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadClientCounts();
  }

  loadClientCounts(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.totalClients = customers.length;
      this.activeClients = customers.filter(c => c.status === 'Active').length;
      this.leadClients = customers.filter(c => c.status === 'Prospect').length;
    });
  }

  get pieData() {
    return [
      { label: 'Active', value: this.activeClients },
      { label: 'Lead', value: this.leadClients },
      { label: 'Unspecified', value: this.totalClients - (this.activeClients + this.leadClients) }
    ];
  }
}
