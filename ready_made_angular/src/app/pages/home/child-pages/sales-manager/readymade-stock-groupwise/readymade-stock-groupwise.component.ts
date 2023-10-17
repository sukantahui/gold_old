import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ReportService} from '../../../../../services/report.service';

@Component({
  selector: 'app-readymade-stock-groupwise',
  templateUrl: './readymade-stock-groupwise.component.html',
  styleUrls: ['./readymade-stock-groupwise.component.scss']
})
export class ReadymadeStockGroupwiseComponent implements OnInit {
  isProduction: boolean = environment.production;
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  showRecord() {
    console.log('testing');
    this.reportService.getStockInHandGroupwise().subscribe(response =>{
        console.log(response);
      });
  }
}
