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
  selectedProductCategoryId: any = null;
  selectedAgentId = null;
  totalQuantity = 0;
  totalGold = 0;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.agents = response.showItemStockResolver.agents.data;
      this.productCategories = response.showItemStockResolver.productCategories.data;
      this.stocksInHand = response.showItemStockResolver.stocksInHand.data;
      this.stocksInHandFiltered = response.showItemStockResolver.stocksInHand.data;
      // tslint:disable-next-line:only-arrow-functions
      this.totalQuantity = this.stocksInHandFiltered.reduce(function(acc, obj) { return acc + obj.quantity; }, 0);
      // tslint:disable-next-line:only-arrow-functions
      this.totalGold = this.stocksInHandFiltered.reduce(function(acc, obj) { return acc + obj.gold; }, 0);
    });

    this.reportForm = new FormGroup({
      agentId: new FormControl('AG0000'),
      productCategoryId: new FormControl(0),
    });
  }

  ngOnInit(): void {
  }

  stockByCategory($event: any, value: any) {

    if ($event && this.selectedAgentId) {
      this.selectedProductCategoryId = $event.ID;
      // tslint:disable-next-line:max-line-length
      this.stocksInHandFiltered = this.stocksInHand.filter(stock => (stock.agentId === this.selectedAgentId && stock.productCategoryId === this.selectedProductCategoryId));
      // // tslint:disable-next-line:only-arrow-functions
      // tslint:disable-next-line:only-arrow-functions
      this.totalQuantity = this.stocksInHandFiltered.reduce(function(acc, obj) {
        return acc + obj.quantity;
      }, 0);
      // tslint:disable-next-line:only-arrow-functions
      this.totalGold = this.stocksInHandFiltered.reduce(function(acc, obj) {
        return acc + obj.gold;
      }, 0);
    }
    if (!$event && this.selectedAgentId) {
      this.selectedProductCategoryId = null;
      // tslint:disable-next-line:max-line-length
      this.stocksInHandFiltered = this.stocksInHand.filter(stock => (stock.agentId === this.selectedAgentId));
      // // tslint:disable-next-line:only-arrow-functions
      // tslint:disable-next-line:only-arrow-functions
      this.totalQuantity = this.stocksInHandFiltered.reduce(function(acc, obj) {
        return acc + obj.quantity;
      }, 0);
      // tslint:disable-next-line:only-arrow-functions
      this.totalGold = this.stocksInHandFiltered.reduce(function(acc, obj) {
        return acc + obj.gold;
      }, 0);
    }
    if ($event && !this.selectedAgentId) {
      this.selectedProductCategoryId = $event.ID;
      // tslint:disable-next-line:max-line-length
      this.stocksInHandFiltered = this.stocksInHand.filter(stock => (stock.productCategoryId === this.selectedProductCategoryId));
      // // tslint:disable-next-line:only-arrow-functions
      // tslint:disable-next-line:only-arrow-functions
      this.totalQuantity = this.stocksInHandFiltered.reduce(function(acc, obj) {
        return acc + obj.quantity;
      }, 0);
      // tslint:disable-next-line:only-arrow-functions
      this.totalGold = this.stocksInHandFiltered.reduce(function(acc, obj) {
        return acc + obj.gold;
      }, 0);
    }
    if (!$event && !this.selectedAgentId) {
      this.selectedProductCategoryId = null;
      // tslint:disable-next-line:max-line-length
      this.stocksInHandFiltered = this.stocksInHand;
      // // tslint:disable-next-line:only-arrow-functions
      // tslint:disable-next-line:only-arrow-functions
      this.totalQuantity = this.stocksInHandFiltered.reduce(function(acc, obj) {
        return acc + obj.quantity;
      }, 0);
      // tslint:disable-next-line:only-arrow-functions
      this.totalGold = this.stocksInHandFiltered.reduce(function(acc, obj) {
        return acc + obj.gold;
      }, 0);
    }
  }

  stockByAgent($event: any, ref1: any) {

    // when agent and productCategory exists
    if ($event && this.selectedProductCategoryId) {
        this.selectedAgentId = $event.agent_id;
        // tslint:disable-next-line:max-line-length
        this.stocksInHandFiltered = this.stocksInHand.filter(stock => stock.agentId === this.selectedAgentId && stock.productCategoryId === this.selectedProductCategoryId);
        // tslint:disable-next-line:only-arrow-functions
        this.totalQuantity = this.stocksInHandFiltered.reduce(function(acc, obj) {
          return acc + obj.quantity;
        }, 0);
        // tslint:disable-next-line:only-arrow-functions
        this.totalGold = this.stocksInHandFiltered.reduce(function(acc, obj) {
          return acc + obj.gold;
        }, 0);
    }
    // when only agent exists
    if ($event && !this.selectedProductCategoryId) {
      this.selectedAgentId = $event.agent_id;
      // tslint:disable-next-line:max-line-length
      this.stocksInHandFiltered = this.stocksInHand.filter(stock => stock.agentId === this.selectedAgentId);
      // tslint:disable-next-line:only-arrow-functions
      this.totalQuantity = this.stocksInHandFiltered.reduce(function(acc, obj) {
        return acc + obj.quantity;
      }, 0);
      // tslint:disable-next-line:only-arrow-functions
      this.totalGold = this.stocksInHandFiltered.reduce(function(acc, obj) {
        return acc + obj.gold;
      }, 0);
    }
    // when only productCategory exists
    if (!$event && this.selectedProductCategoryId) {
      this.selectedAgentId = null;
      // tslint:disable-next-line:max-line-length
      this.stocksInHandFiltered = this.stocksInHand.filter(stock => stock.productCategoryId === this.selectedProductCategoryId);
      // tslint:disable-next-line:only-arrow-functions
      this.totalQuantity = this.stocksInHandFiltered.reduce(function(acc, obj) {
        return acc + obj.quantity;
      }, 0);
      // tslint:disable-next-line:only-arrow-functions
      this.totalGold = this.stocksInHandFiltered.reduce(function(acc, obj) {
        return acc + obj.gold;
      }, 0);
    }
    // when both does not exists
    if (!$event && this.selectedProductCategoryId) {
      this.selectedAgentId = null;
      // tslint:disable-next-line:max-line-length
      this.stocksInHandFiltered = this.stocksInHand;
      // tslint:disable-next-line:only-arrow-functions
      this.totalQuantity = this.stocksInHandFiltered.reduce(function(acc, obj) {
        return acc + obj.quantity;
      }, 0);
      // tslint:disable-next-line:only-arrow-functions
      this.totalGold = this.stocksInHandFiltered.reduce(function(acc, obj) {
        return acc + obj.gold;
      }, 0);
    }
  }

    onFilter($event, dt2: any) {
      if (dt2.filteredValue) {
        this.totalQuantity = dt2.filteredValue.reduce((acc, obj) => acc + obj.quantity, 0);
        this.totalGold = dt2.filteredValue.reduce((acc, obj) => acc + obj.gold, 0);
      }else{
        // tslint:disable-next-line:only-arrow-functions
        this.totalQuantity = this.stocksInHandFiltered.reduce(function(acc, obj) { return acc + obj.quantity; }, 0);
        // tslint:disable-next-line:only-arrow-functions
        this.totalGold = this.stocksInHandFiltered.reduce(function(acc, obj) { return acc + obj.gold; }, 0);
      }
    }
}
