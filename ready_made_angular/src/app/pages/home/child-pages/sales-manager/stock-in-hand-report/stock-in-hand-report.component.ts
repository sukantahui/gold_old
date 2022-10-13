import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {NgSelectComponent} from '@ng-select/ng-select';

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
  stocksInHandFiltered: any;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.agents = response.showItemStockResolver.agents.data;
      this.productCategories = response.showItemStockResolver.productCategories.data;
      this.stocksInHand = response.showItemStockResolver.stocksInHand.data;
      this.stocksInHandFiltered = response.showItemStockResolver.stocksInHand.data;
    });

    this.reportForm = new FormGroup({
      agentId: new FormControl('AG0000'),
      productCategoryId: new FormControl(0),
    });
  }

  ngOnInit(): void {
  }

  stockByCategory($event: any, value: any) {
    // console.log(value.selectedItems[0].value.ID);
    this.stocksInHandFiltered =  this.stocksInHand.filter(stock => stock.productCategoryId === $event.ID);
  }

  stockByAgent($event: any, ref1: any) {
      console.log($event.agent_id);
      this.stocksInHandFiltered =  this.stocksInHand.filter(stock => stock.agentId === $event.agent_id);
  }
}
