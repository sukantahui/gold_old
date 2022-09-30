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
  reportForm: FormGroup;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.agents = response.showItemStockResolver.agents.data;
      this.productCategories = response.showItemStockResolver.productCategories.data;
      this.stocksInHand = response.showItemStockResolver.stocksInHand.data;
    });

    this.reportForm = new FormGroup({
      agentId: new FormControl('AG0000'),
      productCategoryId: new FormControl(0),
    });
  }

  ngOnInit(): void {
  }

  stockByAgentAndCategory($event: any, value: any) {
    console.log(value.selectedItems[0].value.ID);
  }
}
