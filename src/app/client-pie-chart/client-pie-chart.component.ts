// import { Component, Input } from '@angular/core';
// import { ChartType, ChartOptions, ChartData } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';

// @Component({
//   selector: 'app-client-pie-chart',
//   standalone: true,
//   imports: [BaseChartDirective], // ✅ this makes baseChart, [data], [chartType], [options] work
//   template: `
//     <div style="display:block; width:400px; margin:auto;">
//       <canvas baseChart
//               [data]="pieChart"
//               [chartType]="pieChartType"
//               [options]="pieChartOptions">
//       </canvas>
//     </div>
//   `
// })
// export class ClientPieChartComponent {
//   @Input() pieChartLabels: string[] = ['Red', 'Blue', 'Yellow'];
//   @Input() pieChartData: number[] = [300, 500, 100];

//   get pieChart(): ChartData<'pie', number[], string> {
//     return {
//       labels: this.pieChartLabels,
//       datasets: [{ data: this.pieChartData }]
//     };
//   }

//   pieChartType: ChartType = 'pie';
//   pieChartOptions: ChartOptions<'pie'> = {
//     responsive: true,
//     plugins: { legend: { position: 'top' } }
//   };
// }
