import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Stock} from '../../../../../models/stock.model';
import {ManagerService} from '../../../../../services/manager.service';
import {ReportService} from '../../../../../services/report.service';
import {CommonService} from '../../../../../services/common.service';
import {HttpClient} from '@angular/common/http';
import {Job} from '../../../../../models/job.model';
import {RawMaterialModel} from '../../../../../models/raw-material.model';

@Component({
  selector: 'app-top-up-gold',
  templateUrl: './top-up-gold.component.html',
  styleUrls: ['./top-up-gold.component.scss']
})
export class TopUpGoldComponent implements OnInit {
  topUpGoldForm: FormGroup;
  responseMessage: any;
  jobDetails: {gold: any, pan: any, nitric: any, job: Job, bill_no?: string, rm_bangle_pan: RawMaterialModel, rm_nitric: RawMaterialModel};
  totalGoldUse = 0;
  totalPanUse = 0;
  totalNitricUse = 0;
  totalPLoss = 0;
  totalMV = 0;
  finalGini = 0;

  constructor(private managerService: ManagerService, private reportService: ReportService, private commonService: CommonService, private fb: FormBuilder, private http: HttpClient) {
    this.topUpGoldForm = new FormGroup({
      job:  new FormControl(null, [Validators.required]),
      gold:  new FormControl(0, [Validators.required])}
    );
  }

  ngOnInit(): void {
  }

    onSubmit() {
      const job = this.topUpGoldForm.get('job')?.value;
      const gold = this.topUpGoldForm.get('gold')?.value;
      this.managerService.addTopUpGold(job, gold).subscribe((response: {status: any , data: Stock}) =>{
        this.responseMessage = response.data[0];
      });
      this.reportService.getJobDetailsforOwner(job).subscribe({
        next: (res) => {
          this.jobDetails = res.data;
          // calculating total gold used
          this.totalGoldUse = this.jobDetails.gold.map(item => item.gold_value).reduce((a, b) => a + b, 0);
          this.totalPanUse = this.jobDetails.pan.map(item => item.gold_value).reduce((a, b) => a + b, 0);
          this.totalNitricUse = this.jobDetails.nitric.map(item => item.gold_value).reduce((a, b) => a + b, 0);
          this.totalPLoss = this.jobDetails.job.p_loss * this.jobDetails.job.pieces;
          this.totalMV = this.jobDetails.job.markup_value * this.jobDetails.job.pieces;
          // tslint:disable-next-line:max-line-length
          this.finalGini = this.totalGoldUse + this.totalPanUse * this.jobDetails.rm_bangle_pan.bill_percentage + this.totalNitricUse * .93 + this.totalPLoss + this.totalMV;
        },
        error: (err) => {
          alert('Error: ' + err.error.message);
        },
      });
    }

  onReset() {
    this.topUpGoldForm.reset({
      job: null,
      gold: 0
    });
    this.responseMessage = null;
  }

  onSearch() {
    const jobNumber = this.topUpGoldForm.value.job;
    this.reportService.getJobDetailsforOwner(jobNumber).subscribe({
      next: (res) => {
        this.jobDetails = res.data;
        // calculating total gold used
        this.totalGoldUse = this.jobDetails.gold.map(item => item.gold_value).reduce((a, b) => a + b, 0);
        this.totalPanUse = this.jobDetails.pan.map(item => item.gold_value).reduce((a, b) => a + b, 0);
        this.totalNitricUse = this.jobDetails.nitric.map(item => item.gold_value).reduce((a, b) => a + b, 0);
        this.totalPLoss = this.jobDetails.job.p_loss * this.jobDetails.job.pieces;
        this.totalMV = this.jobDetails.job.markup_value * this.jobDetails.job.pieces;
        // tslint:disable-next-line:max-line-length
        this.finalGini = this.totalGoldUse + this.totalPanUse * this.jobDetails.rm_bangle_pan.bill_percentage + this.totalNitricUse * .93 + this.totalPLoss + this.totalMV;
      },
      error: (err) => {
        alert('Error: ' + err.error.message);
      },
    });

  }
}
