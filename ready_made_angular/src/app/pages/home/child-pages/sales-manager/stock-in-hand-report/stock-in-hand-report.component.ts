import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-stock-in-hand-report',
  templateUrl: './stock-in-hand-report.component.html',
  styleUrls: ['./stock-in-hand-report.component.scss']
})
export class StockInHandReportComponent implements OnInit {
  isProduction: boolean = environment.production;
  stocksInHand: any[];
  agents: any[];
  productCategories: any[];
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.agents = response.showItemStockResolver.agents.data;
      this.productCategories = response.showItemStockResolver.productCategories.data;
      this.stocksInHand = response.showItemStockResolver.stocksInHand.data;
      console.log(response.showItemStockResolver.agents.data);
    });
  }

  ngOnInit(): void {
  }

}
