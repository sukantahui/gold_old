import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrls: ['./product-sale.component.scss']
})
export class ProductSaleComponent implements OnInit {
  isProduction: boolean = environment.production;
  constructor() { }

  ngOnInit(): void {
  }

}
