import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReportService} from '../../../../../services/report.service';

@Component({
  selector: 'app-working-job',
  templateUrl: './working-job.component.html',
  styleUrls: ['./working-job.component.scss']
})
export class WorkingJobComponent implements OnInit {
  workingJobList: any[] = [];
  constructor(private http: HttpClient, private reportService: ReportService) {
    this.reportService.getCurrentJobList().subscribe(response => {
     this.workingJobList = response.data;
     console.log(response.data);
    }, (error) => {
      // when error occured
      console.log(error);
    });
  }

  ngOnInit(): void {
  }

}
