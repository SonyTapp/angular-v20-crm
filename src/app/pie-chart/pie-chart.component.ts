import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, PieController, ArcElement, Tooltip, Legend, ChartOptions, ChartData } from 'chart.js';
import { CommonModule } from '@angular/common';
import { withInterceptors } from '@angular/common/http';

// Register required Chart.js components
Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PieChartComponent implements OnChanges {
  @Input() data: { label: string; value: number }[] = [];

// ----- Chart Data -----
chartData: ChartData<'pie', number[], string | string[]> = {
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: [],
    borderColor: '#000000ff',
    borderWidth: 2,
    hoverOffset: 20  // ✅ stays here in the dataset
  }]
};

// ----- Chart Options -----
chartOptions: ChartOptions<'pie'> = {
  responsive: true,
  layout: {
    padding: 12    // ✅ padding goes here in chartOptions
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#000000',
        // font: { weight: 'bold' }
      }
    },
    tooltip: {
        enabled: true,
        backgroundColor: '#ffffff',
        borderColor: '#333333',
        borderWidth: 1,
        titleColor: '#000000',  // title text color
        bodyColor: '#000000',   // body text color
        footerColor: '#000000'  // optional footer text color
}

  }
};


  chart: Chart<'pie', number[], string | string[]> | null = null;

  // ----- Default Slice Colors -----
  private defaultColors = [
    '#64cb67ff', // green
    '#3190ddff', // blue
    '#e69a28ff', // orange
    '#f44336', // red
    '#9c27b0', // purple
    '#00bcd4'  // cyan
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      // update chart data
      this.chartData.labels = this.data.map(d => d.label);
      this.chartData.datasets[0].data = this.data.map(d => d.value);
      this.chartData.datasets[0].backgroundColor = this.data.map(
        (_, i) => this.defaultColors[i % this.defaultColors.length]
      );

      // create or update chart
      if (this.chart) {
        this.chart.data = this.chartData;
        this.chart.update();
      } else {
        const ctx = (document.getElementById('pieChart') as HTMLCanvasElement)?.getContext('2d');
        if (ctx) {
          this.chart = new Chart(ctx, {
            type: 'pie',
            data: this.chartData,
            options: this.chartOptions
          });
        }
      }
    }
  }
}
