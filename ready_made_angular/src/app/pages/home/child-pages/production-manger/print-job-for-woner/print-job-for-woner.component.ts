import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ReportService} from '../../../../../services/report.service';
import {CommonService} from '../../../../../services/common.service';
import {Job} from '../../../../../models/job.model';
import {RawMaterialModel} from '../../../../../models/raw-material.model';

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
  jobDetails: {gold: any, pan: any, nitric: any, job: Job, bill_no?: string, rm_bangle_pan: RawMaterialModel, rm_nitric: RawMaterialModel};
  totalGoldUse = 0;
  totalPanUse = 0;
  totalNitricUse = 0;
  totalPLoss = 0;
  totalMV = 0;
  finalGini = 0;

  // tslint:disable-next-line:max-line-length
  constructor(private reportService: ReportService, private commonService: CommonService, private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      jobNumber: ['', Validators.required],
    });
  }
    printDivStyle = `
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  th, td {
    padding: 8px;
    border: 1px solid black;
  }
  th {
    text-align: left;
  }
  .text-end, .text-right {
    text-align: right !important;
  }
  .text-center {
    text-align: center !important;
  }
  .fw-bold {
    font-weight: bold !important;
  }
`;

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
        this.totalPLoss = this.jobDetails.job.p_loss * this.jobDetails.job.pieces;
        this.totalMV = this.jobDetails.job.markup_value * this.jobDetails.job.pieces;
        this.finalGini = this.totalGoldUse + this.totalPanUse * this.jobDetails.rm_bangle_pan.bill_percentage + this.jobDetails.job.nitrick_returned*-1 + this.totalPLoss + this.totalMV;
      },
      error: (err) => {
        console.log(err);
        alert('Error: ' + err.error.message);
      },
    });

  }


}
