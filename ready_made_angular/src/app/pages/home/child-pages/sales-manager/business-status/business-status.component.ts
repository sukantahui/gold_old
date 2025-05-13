import { Component, OnInit } from '@angular/core';
import {ReportService} from '../../../../../services/report.service';
export interface BusinessStatusInterface {
  all_customer_gold_due: {particulars: string};
  stock_customer_gold_due: object;
  readymade_stock_gold: object;
  work_in_progress: object;
  material_balance: object;
  markup_value: object;
  ploss: object;
}
@Component({
  selector: 'app-business-status',
  templateUrl: './business-status.component.html',
  styleUrls: ['./business-status.component.scss']
})
export class BusinessStatusComponent implements OnInit {

  constructor(private reportService: ReportService) { }
  businessStatus: BusinessStatusInterface;

  printDivStyle = {
    table: {'border-collapse': 'collapse', width : '100%' },
    label: {width: '100%'},
    th: {border: '1px  solid black' , fontSize : 'small'},
    td: {border: '1px  solid black' , fontSize : 'small'},

  };

  ngOnInit(): void {
  }

    getBusinessStatus() {
      this.reportService.getBusinessStatus().subscribe((response: {status: boolean, message: string, data: BusinessStatusInterface}) => {
        if (response.status && response.data) {
          this.businessStatus = response.data;
          console.log('All Customer Gold Due:', this.businessStatus.all_customer_gold_due);
        } else {
          console.warn('Invalid response structure:', response);
        }
      });
    }
}
