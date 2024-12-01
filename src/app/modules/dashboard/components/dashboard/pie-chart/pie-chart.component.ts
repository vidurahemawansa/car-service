import { Component, Input, OnChanges } from '@angular/core';
import { jobs } from '../../../models/jobs';
import { SimpleChanges } from '@angular/core';
import { ChartOptions, Colors } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnChanges {
  @Input() jobList: jobs[] = [];

  jobsDone: jobs[] = [];
  jobsNotDone: jobs[] = [];
  chartData: any[] = [];
  pieChartLabels: string[] = [];
  pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    backgroundColor: '#333',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobList']) {
      this.jobsDone = this.jobList.filter((job) => job.isJobDone);
      console.log(this.jobsDone);
      this.pieChartCalculation();
    }
  }

  pieChartCalculation() {
    const totalCount = this.jobList.length;
    const jobsDoneCount = this.jobsDone.length;
    const jobsNotDoneCount = totalCount - jobsDoneCount;
    this.chartData = [
      {
        data: [jobsDoneCount, jobsNotDoneCount],
        backgroundColor: ['#28A745', '#FFC107'],
      },
    ];
    this.pieChartLabels = [
      `${jobsDoneCount} jobs done (${(jobsDoneCount / totalCount) * 100}%)`,
      `${jobsNotDoneCount} jobs In-progress (${
        (jobsNotDoneCount / totalCount) * 100
      }%)`,
    ];
  }
}
