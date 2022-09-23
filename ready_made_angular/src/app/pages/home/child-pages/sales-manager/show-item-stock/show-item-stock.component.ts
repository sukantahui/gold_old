import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-item-stock',
  templateUrl: './show-item-stock.component.html',
  styleUrls: ['./show-item-stock.component.scss']
})
export class ShowItemStockComponent implements OnInit {
  // tslint:disable-next-line:ban-types
    isProduction: Boolean = environment.production;
  agents: any[] = [];
  productCategories: any[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.agents = response.showItemStockResolver.agents.data;
      this.productCategories = response.showItemStockResolver.productCategories.data;
    });
  }

  ngOnInit(): void {
  }

}
