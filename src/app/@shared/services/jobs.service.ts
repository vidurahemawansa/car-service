import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jobs } from '../../modules/dashboard/models/jobs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  jobsUrl: string = '../../../assets/jobs.json';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<jobs[]> {
    const jobs = this.http.get<jobs[]>(this.jobsUrl);
    return jobs;
  }
}
