import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { jobs } from '../../../models/jobs';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrl: './job-table.component.scss',
})
export class JobTableComponent {
  @Input() jobList: jobs[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  toggleJobStatus(job: any, isJobDone: boolean): void {
    job.isJobDone = isJobDone;
    this.cdr.detectChanges();
  }

  trackByLicensePlate(index: number, job: any): string {
    return job.licensePlate;
  }
}
