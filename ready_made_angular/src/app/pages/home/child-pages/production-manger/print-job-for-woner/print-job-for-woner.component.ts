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
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        alert('Error: ' + err.error.message);
      },
    });

  }
}
