// customer-display.component.ts
import { Component, Input } from '@angular/core';
import { Customer } from '../customer';


@Component({
  selector: 'app-customer-display',
  templateUrl: './customer-display.component.html',
  styleUrls: ['./customer-display.component.css'],
  standalone: true,
  imports: []
})
export class CustomerDisplayComponent {
  @Input() customer?: Customer;
}
