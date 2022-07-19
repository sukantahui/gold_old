import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-salary-adjustment',
  templateUrl: './salary-adjustment.component.html',
  styleUrls: ['./salary-adjustment.component.scss']
})
export class SalaryAdjustmentComponent implements OnInit {
  isProduction = environment.production;
  salaryHolders: any[];
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.salaryHolders = response.salaryAdjustmentResolver.salaryHolders.data;
    });
  }

  ngOnInit(): void {
  }

}
