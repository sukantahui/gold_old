import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {environment} from '../../../../../../environments/environment';
import {ReportService} from '../../../../../services/report.service';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-extra-gold-add',
  templateUrl: './extra-gold-add.component.html',
  styleUrls: ['./extra-gold-add.component.scss']
})
export class ExtraGoldAddComponent implements OnInit {
  goldAddForm: UntypedFormGroup;
  isProduction: boolean = environment.production;
  subject = 'Developer Area';
  isLoading: any = false;
  job: any = undefined;
  previousExtraGoldLists: any;

  constructor(private reportService: ReportService) {
    this.goldAddForm = new UntypedFormGroup({
      jobId: new UntypedFormControl(null),
      gold: new UntypedFormControl(null)
    });
  }

  ngOnInit(): void {
  }

  fetchJob(jobId: HTMLInputElement) {
    this.isLoading = true;
    this.reportService.getJobById(jobId.value).subscribe((response) => {
      this.job = response.data;
      this.isLoading = false;
    }, error => {
      this.job = undefined;
      this.isLoading = false;
    });


    this.reportService.getExtraGoldAddByJobId(jobId.value).subscribe((response) => {
      this.previousExtraGoldLists = response.data;
      console.log(this.previousExtraGoldLists);
    }, error => {
      this.previousExtraGoldLists = [];
    });

  }
}
