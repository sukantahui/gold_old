import { Component, OnInit } from '@angular/core';
import {ReportService} from '../../../../../services/report.service';
import {environment} from '../../../../../../environments/environment';

export interface GoldItem {
  particulars: string;
  material_value: number;
  gold_percentage: number;
  pure_value: number;
  qty?: number; // Optional: only present in some entries
}

export interface CashItem {
  particulars: string;
  amount: number;
  qty?: number; // Optional: only present in some entries
}
export interface MaterialBalance {
  bangle_pan: GoldItem;
  fine_gold: GoldItem;
  pure_silver: GoldItem;
  nitric_gold: GoldItem;
  gini_92: GoldItem; // Renamed from "92_gini"
     dal: GoldItem;
}
export interface BusinessStatusInterface {
  all_customer_gold_due: GoldItem;
  stock_customer_gold_due: GoldItem;
  readymade_stock_gold: GoldItem;
  work_in_progress: GoldItem;
  material_balance_employees: MaterialBalance;
  material_balance_manager: MaterialBalance;
  markup_value: GoldItem;
  ploss: GoldItem;
  all_customer_lc_due: CashItem;
  stock_customer_lc_due: CashItem;
  readymade_stock_lc: CashItem;
  employee_cash_balance: CashItem;
  manager_cash_balance: CashItem;
  work_in_progress_lc: CashItem;
  order_not_jobbed: CashItem;
  order_details_quantity_not_jobbed: CashItem;
}
@Component({
  selector: 'app-business-status',
  templateUrl: './business-status.component.html',
  styleUrls: ['./business-status.component.scss']
})
export class BusinessStatusComponent implements OnInit {
  isProduction = environment.production;
  totalFineGoldValue_employees = 0;
  gold_balance_employee = 0;
  gold_balance_manager = 0;

  constructor(private reportService: ReportService) { }
  businessStatus: BusinessStatusInterface;
  currentDate = new Date();
  printDivStyle = {
    table: {'border-collapse': 'collapse', width : '100%' },
    label: {width: '100%'},
    th: {border: '1px  solid black' , fontSize : 'small'},
    td: {border: '1px  solid black' , fontSize : 'small'},
    '.text-right': {textAlign: 'right'},
  }


  totalFineGoldValue = 0;
  totalFineCashValue = 0;
  ngOnInit(): void {
  }

    getBusinessStatus() {
      this.reportService.getBusinessStatus().subscribe((response: {status: boolean, message: string, data: BusinessStatusInterface}) => {
        if (response.status && response.data) {
          this.businessStatus = response.data;
          this.gold_balance_employee = this.businessStatus.material_balance_employees.fine_gold.pure_value
          + this.businessStatus.material_balance_employees.gini_92.pure_value
          + this.businessStatus.material_balance_employees.bangle_pan.pure_value
          + this.businessStatus.material_balance_employees.nitric_gold.pure_value;

          this.gold_balance_manager = this.businessStatus.material_balance_manager.fine_gold.pure_value
              + this.businessStatus.material_balance_manager.gini_92.pure_value
              + this.businessStatus.material_balance_manager.bangle_pan.pure_value
              + this.businessStatus.material_balance_manager.nitric_gold.pure_value;



          this.totalFineGoldValue = this.businessStatus.all_customer_gold_due.pure_value
                                    + this.businessStatus.stock_customer_gold_due.pure_value
                                    + this.businessStatus.readymade_stock_gold.pure_value
                                    + this.businessStatus.work_in_progress.pure_value
                                    + this.gold_balance_employee
                                    + this.gold_balance_manager
                                    + this.businessStatus.markup_value.pure_value
                                    + this.businessStatus.ploss.pure_value;

          this.totalFineCashValue = this.businessStatus.all_customer_lc_due.amount
                + this.businessStatus.stock_customer_lc_due.amount
                + this.businessStatus.readymade_stock_lc.amount
                + this.businessStatus.work_in_progress_lc.amount
                + this.businessStatus.employee_cash_balance.amount
                + this.businessStatus.manager_cash_balance.amount;
        } else {
          console.warn('Invalid response structure:', response);
        }
      });
    }
}
