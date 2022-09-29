import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-stock-in-hand-report',
  templateUrl: './stock-in-hand-report.component.html',
  styleUrls: ['./stock-in-hand-report.component.scss']
})
export class StockInHandReportComponent implements OnInit {
  isProduction: boolean = environment.production;
  constructor() { }

  ngOnInit(): void {
  }

}
