import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../../../../../services/manager.service';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';

// Custom DateAdapter for DD/MM/YYYY format
export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

// Date format configuration
export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
// =========================
// Outside Items P-Loss
// =========================

interface MonthlyOutsideItemsPloss {

  bill_date: string;
  bill_no: string;
  tag: string;
  model_no: string;
  qty: number;
  p_loss: number;
  total_ploss: number;
  total_ploss_fine: number;

}

interface MonthlyOutsideItemsPlossResponse {

  status: boolean;
  message: string | null;
  data: MonthlyOutsideItemsPloss[];

}
// =========================
// Manufactured P-Loss
// =========================

interface MonthlyBillwisePloss {
  bill_date: string;
  bill_no: string;
  cust_name: string;
  qty: number;
  total_ploss: number;
  total_ploss_fine: number;
}

interface MonthlyBillwisePlossResponse {
  status: boolean;
  message: string | null;
  data: MonthlyBillwisePloss[];
}

// =========================
// Ready Made P-Loss
// =========================

interface MonthlyReadyMadePloss {
  bill_date: string;
  bill_no: string;
  tag: string;
  job_id: number;
  qty: number;
  p_loss: number;
  total_ploss: number;
  total_ploss_fine: number;
}

interface MonthlyReadyMadePlossResponse {
  status: boolean;
  message: string | null;
  data: MonthlyReadyMadePloss[];
}

@Component({
  selector: 'app-monthly-ploss-report',
  templateUrl: './monthly-ploss-report.component.html',
  styleUrls: ['./monthly-ploss-report.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
})
export class MonthlyPlossReportComponent implements OnInit {

  dateFrom: Date | null = null;
  dateTo: Date | null = null;

  loading = false;
  consolidatedQty = 0;
  consolidatedPloss = 0;
  consolidatedFine = 0;

  readyMadeTotalFine = 0;
  outsideItemsReport: MonthlyOutsideItemsPloss[] = [];
  outsideItemsTotalQty = 0;
  outsideItemsTotalPloss = 0;
  outsideItemsTotalFine = 0;

  // =========================
  // Manufactured Report
  // =========================

  report: MonthlyBillwisePloss[] = [];

  totalQty = 0;
  totalPloss = 0;
  totalFine = 0;

  // =========================
  // Ready Made Report
  // =========================

  readyMadeReport: MonthlyReadyMadePloss[] = [];

  readyMadeTotalQty = 0;
  readyMadeTotalPloss = 0;

  constructor(
      private managerService: ManagerService
  ) { }

  ngOnInit(): void {

    const today = new Date();

    this.dateFrom = new Date(today.getFullYear(), today.getMonth(), 1);

    this.dateTo = today;

  }

  private formatDateForApi(date: Date): string {

    const yyyy = date.getFullYear();
    const mm = ('0' + (date.getMonth() + 1)).slice(-2);
    const dd = ('0' + date.getDate()).slice(-2);

    return `${yyyy}-${mm}-${dd}`;

  }

  generateReport(): void {

    if (!this.dateFrom || !this.dateTo) {
      return;
    }

    this.loading = true;

    const from = this.formatDateForApi(this.dateFrom);
    const to = this.formatDateForApi(this.dateTo);

    this.loadManufacturedReport(from, to);
    this.loadReadyMadeReport(from, to);
    this.loadOutsideItemsReport(from, to);

  }

  // =====================================
  // Manufactured Report
  // =====================================
  private calculateConsolidatedTotals(): void {

    this.consolidatedQty =
        this.totalQty +
        this.readyMadeTotalQty +
        this.outsideItemsTotalQty;

    this.consolidatedPloss =
        this.totalPloss +
        this.readyMadeTotalPloss +
        this.outsideItemsTotalPloss;

    this.consolidatedFine =
        this.totalFine +
        this.readyMadeTotalFine +
        this.outsideItemsTotalFine;

  }
  private loadManufacturedReport(from: string, to: string): void {

    this.managerService.getMonthlyBillwisePlossBySale({
      dateFrom: from,
      dateTo: to
    }).subscribe(

        (response: MonthlyBillwisePlossResponse) => {

          if (response.status) {

            this.report = response.data;

            this.calculateTotals();
            this.calculateConsolidatedTotals();
          }

          this.loading = false;

        },

        () => {

          this.loading = false;

        }

    );

  }

  private calculateTotals(): void {

    this.totalQty = 0;
    this.totalPloss = 0;
    this.totalFine = 0;

    this.report.forEach(item => {

      this.totalQty += Number(item.qty);

      this.totalPloss += Number(item.total_ploss);

      this.totalFine += Number(item.total_ploss_fine);

    });

  }

  // =====================================
  // Ready Made Report
  // =====================================
  private calculateOutsideItemsTotals(): void {
    this.outsideItemsTotalQty = 0;
    this.outsideItemsTotalPloss = 0;
    this.outsideItemsTotalFine = 0;
    this.outsideItemsReport.forEach(item => {
      this.outsideItemsTotalQty += Number(item.qty);
      this.outsideItemsTotalPloss += Number(item.total_ploss);
      this.outsideItemsTotalFine += Number(item.total_ploss_fine);
    });
  }
  private loadReadyMadeReport(from: string, to: string): void {

    this.managerService.getMonthlyReadyMadeBillwisePlossBySale({
      dateFrom: from,
      dateTo: to
    }).subscribe(

        (response: MonthlyReadyMadePlossResponse) => {

          if (response.status) {

            this.readyMadeReport = response.data;

            this.calculateReadyMadeTotals();
            this.calculateConsolidatedTotals();
          }

        }

    );

  }
  private loadOutsideItemsReport(from: string, to: string): void {

    this.managerService.getMonthlyReadyMadeOutsideItemsPlossBySale({

      dateFrom: from,

      dateTo: to

    }).subscribe(

        (response: MonthlyOutsideItemsPlossResponse) => {

          if (response.status) {

            this.outsideItemsReport = response.data;

            this.calculateOutsideItemsTotals();

            this.calculateConsolidatedTotals();

          }

        }

    );

  }
  private calculateReadyMadeTotals(): void {

    this.readyMadeTotalQty = 0;
    this.readyMadeTotalPloss = 0;
    this.readyMadeTotalFine = 0;

    this.readyMadeReport.forEach(item => {

      this.readyMadeTotalQty += Number(item.qty);

      this.readyMadeTotalPloss += Number(item.total_ploss);

      this.readyMadeTotalFine += Number(item.total_ploss_fine);

    });

  }

}
