import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-monthly-managerial-report',
  templateUrl: './monthly-managerial-report.component.html',
  styleUrls: ['./monthly-managerial-report.component.scss']
})
export class MonthlyManagerialReportComponent implements OnInit {

  selectedYear: number | null = null;
  selectedMonth: number | null = null;

  years: number[] = [];

  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];
  loadComponent = false;

  constructor(
  ) {}

  ngOnInit(): void {

    // Generate year list (current year to last 10 years)
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;

    for (let i = currentYear; i >= currentYear - 10; i--) {
      this.years.push(i);
    }
  }

  reloadComponent() {
    this.loadComponent = false;

    setTimeout(() => {
      this.loadComponent = true;
    }, 0);
  }
}
