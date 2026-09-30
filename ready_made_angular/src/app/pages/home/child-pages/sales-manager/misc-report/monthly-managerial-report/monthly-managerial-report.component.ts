import { Component, OnInit } from '@angular/core';

export interface ReportSegment {
  id: string;
  name: string;
  icon: string;
  rmId: number;
  purity: string;
  badgeClass: string;
  colorHex: string;
}

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

  segments: ReportSegment[] = [
    { id: '92-gold', name: '92 Gold', icon: '🥇', rmId: 48, purity: '92% Fine', badgeClass: 'badge-gold', colorHex: '#d97706' },
    { id: 'fine-gold', name: 'Fine Gold', icon: '✨', rmId: 36, purity: '100% Fine', badgeClass: 'badge-fine', colorHex: '#eab308' },
    { id: 'nitric-gold', name: 'Nitric Gold', icon: '🧪', rmId: 45, purity: '87.5% Fine', badgeClass: 'badge-nitric', colorHex: '#059669' },
    { id: 'pan-gold', name: 'Pan Gold', icon: '🪞', rmId: 31, purity: '40% Fine', badgeClass: 'badge-pan', colorHex: '#2563eb' },
    { id: 'dal', name: 'Dal', icon: '🥣', rmId: 33, purity: 'Custom Material', badgeClass: 'badge-dal', colorHex: '#7c3aed' },
    { id: 'silver', name: 'Silver', icon: '🥈', rmId: 38, purity: '100% Silver', badgeClass: 'badge-silver', colorHex: '#64748b' }
  ];

  activeTab: string = 'all';
  loadComponent = false;

  constructor() {}

  ngOnInit(): void {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    this.selectedYear = currentYear;
    this.selectedMonth = currentMonth;

    for (let i = currentYear; i >= currentYear - 10; i--) {
      this.years.push(i);
    }
  }

  reloadComponent(): void {
    if (!this.selectedYear || !this.selectedMonth) {
      return;
    }
    this.loadComponent = false;

    setTimeout(() => {
      this.loadComponent = true;
    }, 50);
  }

  onSelectionChange(): void {
    if (!this.selectedYear || !this.selectedMonth) {
      this.loadComponent = false;
    }
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  selectCurrentMonth(): void {
    const today = new Date();
    this.selectedYear = today.getFullYear();
    this.selectedMonth = today.getMonth() + 1;
    this.reloadComponent();
  }

  getMonthName(monthVal: number | null): string {
    if (!monthVal) {
      return '';
    }
    const found = this.months.find(m => m.value === monthVal);
    return found ? found.name : '';
  }

  scrollToSegment(segmentId: string): void {
    if (this.activeTab !== 'all') {
      this.activeTab = segmentId;
      return;
    }
    const element = document.getElementById('segment-' + segmentId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
