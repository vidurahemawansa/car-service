import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../../../@shared/services/jobs.service';
import { jobs } from '../../models/jobs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  jobList: jobs[] = [];
  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.jobsService.getJobs().subscribe((result) => {
      this.jobList = result;
      console.log(result);
    });
  }
}
