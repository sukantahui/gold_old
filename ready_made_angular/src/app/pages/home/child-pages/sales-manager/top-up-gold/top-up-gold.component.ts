import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stock } from '../../../../../models/stock.model';
import { ManagerService } from '../../../../../services/manager.service';
import { ReportService } from '../../../../../services/report.service';
import { CommonService } from '../../../../../services/common.service';
import { Job } from '../../../../../models/job.model';
import { RawMaterialModel } from '../../../../../models/raw-material.model';

interface JobDetailsResponse {
  gold: { gold_value: number }[];
  pan: { gold_value: number }[];
  nitric: { gold_value: number }[];
  job: Job;
  bill_no?: string;
  rm_bangle_pan: RawMaterialModel;
  rm_nitric: RawMaterialModel;
}

@Component({
  selector: 'app-top-up-gold',
  templateUrl: './top-up-gold.component.html',
  styleUrls: ['./top-up-gold.component.scss']
})
export class TopUpGoldComponent implements OnInit {
  topUpGoldForm: FormGroup;
  responseMessage: Stock | null = null;
  jobDetails!: JobDetailsResponse;

  totalGoldUse = 0;
  totalPanUse = 0;
  totalNitricUse = 0;
  totalPLoss = 0;
  totalMV = 0;
  finalGini = 0;

  constructor(
      private managerService: ManagerService,
      private reportService: ReportService,
      private commonService: CommonService,
      private fb: FormBuilder
  ) {
    // ✅ Cleaner form initialization using FormBuilder
    this.topUpGoldForm = this.fb.group({
      job: [null, Validators.required],
      gold: [0, Validators.required]
    });
  }

  ngOnInit(): void {}

  /** Handle submit: adds top-up gold and reloads job details */
  onSubmit(): void {
    const { job, gold } = this.topUpGoldForm.value;

    this.managerService.addTopUpGold(job, gold).subscribe({
      next: (response: { status: any; data: Stock[] }) => {
        this.responseMessage = response.data[0];
      }
    });

    this.loadJobDetails(job);
  }

  /** Reset the form and data */
  onReset(): void {
    this.topUpGoldForm.reset({ job: null, gold: 0 });
    this.responseMessage = null;
    this.resetTotals();
  }

  /** Search job details without adding gold */
  onSearch(): void {
    const jobNumber = this.topUpGoldForm.value.job;
    if (jobNumber) {
      this.loadJobDetails(jobNumber);
    }
  }

  /** Shared method to fetch job details and calculate totals */
  private loadJobDetails(jobId: string | number): void {
    this.reportService.getJobDetailsforOwner(jobId).subscribe({
      next: (res) => {
        this.jobDetails = res.data;
        this.calculateTotals();
      },
      error: (err) => {
        alert('Error: ' + err.error.message);
      }
    });
  }

  /** Reset totals */
  private resetTotals(): void {
    this.totalGoldUse = 0;
    this.totalPanUse = 0;
    this.totalNitricUse = 0;
    this.totalPLoss = 0;
    this.totalMV = 0;
    this.finalGini = 0;
  }

  /** Calculate all totals based on job details */
  private calculateTotals(): void {
    this.totalGoldUse = this.sumValues(this.jobDetails.gold);
    this.totalPanUse = this.sumValues(this.jobDetails.pan);
    this.totalNitricUse = this.sumValues(this.jobDetails.nitric);

    this.totalPLoss = this.jobDetails.job.p_loss * this.jobDetails.job.pieces;
    this.totalMV = this.jobDetails.job.markup_value * this.jobDetails.job.pieces;

    this.finalGini =
        this.totalGoldUse +
        this.totalPanUse * this.jobDetails.rm_bangle_pan.bill_percentage +
        this.totalNitricUse * 0.93 +
        this.totalPLoss +
        this.totalMV;
  }

  /** Helper to sum gold values */
  private sumValues(items: { gold_value: number }[]): number {
    return items.reduce((sum, item) => sum + item.gold_value, 0);
  }
}
