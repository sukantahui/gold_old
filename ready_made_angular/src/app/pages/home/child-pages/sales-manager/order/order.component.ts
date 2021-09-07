import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CommonService} from "../../../../../services/common.service";
import {formatDate} from "@angular/common";
import {AgentService} from "../../../../../services/agent.service";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../../../../services/product.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  agents: any[];
  customers: any[];
  products: any[];

  constructor(private commonService: CommonService, private agentService: AgentService, private http: HttpClient, private productService: ProductService) {
    this.agents = this.agentService.getAgents();
    this.products = this.productService.getProducts();
    const now = new Date();
    const currentSQLDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.orderForm = new FormGroup({
      order_date: new FormControl(currentSQLDate),
      delivery_date: new FormControl(currentSQLDate),
      agent_id: new FormControl(null),
      cust_id: new FormControl(null),
      product_code: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.agentService.getAgentUpdateListener().subscribe((response: any[]) => {
      this.agents = response;
    });
    this.productService.getProductUpdateListener().subscribe((response: any[]) => {
      this.products = response;
    });
  }




  agentSelected() {
    this.http.get(this.commonService.getAPI() + '/dev/customers/agent/AG2006/inforced').subscribe((response: {success: number , data: any[]}) => {
      this.customers =  response.data;
    });
  }

  customerSelected() {

  }

  productSelected() {

  }
}
