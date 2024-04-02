import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-job-details-report',
  templateUrl: './job-details-report.component.html',
  styleUrls: ['./job-details-report.component.scss']
})
export class JobDetailsReportComponent implements OnInit {
  private karigars: any;
  private reportForm: FormGroup;
  private endDate: string;
  private startDate: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.data.subscribe((response: any) => {
      this.karigars = response.karigarResolver.karigars.data;
    });
    const now = new Date();
    const currentSQLDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.startDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.endDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.reportForm = new FormGroup({
      start_date: new FormControl(currentSQLDate),
      end_date: new FormControl(currentSQLDate),
      karigar_id: new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

}
