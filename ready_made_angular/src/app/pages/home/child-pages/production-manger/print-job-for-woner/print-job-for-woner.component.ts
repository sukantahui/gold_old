import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ReportService} from '../../../../../services/report.service';
import {CommonService} from '../../../../../services/common.service';

@Component({
  selector: 'app-print-job-for-woner',
  templateUrl: './print-job-for-woner.component.html',
  styleUrls: ['./print-job-for-woner.component.scss']
})
export class PrintJobForWonerComponent implements OnInit {
  isProduction: boolean = environment.production;
  searchForm: FormGroup;
  // tslint:disable-next-line:ban-types
  jobData: Object;
  jobDetails: {gold: any, pan: any, nitric: any};
  totalGoldUse = 0;
  totalPanUse = 0;
  totalNitricUse = 0;
  // tslint:disable-next-line:max-line-length
  constructor(private reportService: ReportService, private commonService: CommonService, private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      jobNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSearch() {
    const jobNumber = this.searchForm.value.jobNumber;

    this.reportService.getJobDetailsforOwner(jobNumber).subscribe({
      next: (res) => {
        this.jobDetails = res.data;
        // calculating total gold used
        this.totalGoldUse = this.jobDetails.gold.map(item => item.gold_value).reduce((a, b) => a + b, 0);
        this.totalPanUse = this.jobDetails.pan.map(item => item.gold_value).reduce((a, b) => a + b, 0);
        this.totalNitricUse = this.jobDetails.nitric.map(item => item.gold_value).reduce((a, b) => a + b, 0);
      },
      error: (err) => {
        console.log(err);
        alert('Error: ' + err.error.message);
      },
    });

  }
}
