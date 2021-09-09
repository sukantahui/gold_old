import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../../../services/common.service';
import {formatDate} from '@angular/common';
import {AgentService} from '../../../../../services/agent.service';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../../../../services/product.service';
import {CustomerCategoryService} from '../../../../../services/customer-category.service';
import {PriceMaster} from "../../../../../models/price-master.model";

export interface Item{
  product_code: string;
  cust_category: any;
  lc: number;
  ploss: number;
  product_mv: number;
  total_mv: number;
  cust_mv: number;
  qty: number;
  expected_gold: number;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderFormMaster: FormGroup;
  orderFormDetails: FormGroup;
  agents: any[];
  customers: any[];
  products: any[];
  selectedProduct: any;
  customerCategories: any[];
  selectedCustomerCategory: any;
  selectedPriceMaster: PriceMaster;
  selectedCustomer: any;
  orderMaster={cust_id: ''};
  item: Item;
  orderDetails: Item[] = [];


  constructor(private commonService: CommonService, private agentService: AgentService, private http: HttpClient, private productService: ProductService, private customerCategoryService: CustomerCategoryService) {
    this.agents = this.agentService.getAgents();
    this.products = this.productService.getProducts();
    this.customerCategories = this.customerCategoryService.getCategories();
    const now = new Date();
    const currentSQLDate = formatDate(now, 'yyyy-MM-dd', 'en');

    this.orderFormMaster = new FormGroup({
      order_date: new FormControl(currentSQLDate),
      delivery_date: new FormControl(currentSQLDate),
      agent_id: new FormControl(null, [Validators.required]),
      cust_id: new FormControl(null, [Validators.required]),
      cust_mv: new FormControl(null, [Validators.required]),
    });
    this.orderFormDetails = new FormGroup({
      product_code: new FormControl(null, [Validators.required]),
      customer_category_id: new FormControl(null, [Validators.required]),
      lc: new FormControl(null, [Validators.required]),
      ploss: new FormControl(null, [Validators.required]),
      product_mv: new FormControl(null, [Validators.required]),
      qty: new FormControl(null, [Validators.required]),
      expected_gold: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.agentService.getAgentUpdateListener().subscribe((response: any[]) => {
      this.agents = response;
    });
    this.productService.getProductUpdateListener().subscribe((response: any[]) => {
      this.products = response;
    });
    this.customerCategoryService.getCustomerCategoryUpdateListener().subscribe((response: any[]) => {
      this.customerCategories = response;
    });
  }




  agentSelected() {
    // tslint:disable-next-line:max-line-length
    this.http.get(this.commonService.getAPI() + '/dev/customers/agent/AG2006/inforced').subscribe((response: {success: number , data: any[]}) => {
      this.customers =  response.data;
    });
  }

  customerSelected($event) {
    this.selectedCustomer = $event;
    this.orderMaster.cust_id=this.selectedCustomer.cust_id;
    this.orderFormMaster.get('cust_mv').patchValue(this.selectedCustomer.markup_value, { onlySelf: true });
  }

  productSelected(val) {
    this.selectedProduct = val;
    this.orderFormDetails.get('customer_category_id').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('lc').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('ploss').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('product_mv').patchValue(null, { onlySelf: true });
  }

  customerCategorySelected($event: any) {
    if($event != null){
        this.selectedCustomerCategory = $event;
        // tslint:disable-next-line:max-line-length
        this.http.get(this.commonService.getAPI() + '/dev/priceMasters/' + this.selectedProduct.price_code + '/' + this.selectedCustomerCategory.ID).subscribe((response: {success: number , data: PriceMaster}) => {
          this.selectedPriceMaster =  response.data;
          this.orderFormDetails.get('lc').patchValue(this.selectedPriceMaster.price, { onlySelf: true });
          this.orderFormDetails.get('ploss').patchValue(this.selectedPriceMaster.p_loss, { onlySelf: true });
          this.orderFormDetails.get('product_mv').patchValue(this.selectedPriceMaster.price_master_mv, { onlySelf: true });
        });
    }else{
      this.selectedCustomerCategory = $event;
      this.orderFormDetails.get('lc').patchValue(null, { onlySelf: true });
      this.orderFormDetails.get('ploss').patchValue(null, { onlySelf: true });
      this.orderFormDetails.get('product_mv').patchValue(null, { onlySelf: true });
    }

  }

  addItem() {
    this.item={
                product_code: this.orderFormDetails.get('product_code').value,
                cust_category: this.selectedCustomerCategory,
                lc: this.orderFormDetails.get('lc').value,
                ploss: this.orderFormDetails.get('ploss').value,
                product_mv: this.orderFormDetails.get('product_mv').value,
                cust_mv: this.orderFormMaster.get('cust_mv').value,
                total_mv: (this.orderFormDetails.get('product_mv').value + this.orderFormMaster.get('cust_mv').value),
                qty: this.orderFormDetails.get('qty').value,
                expected_gold: this.orderFormDetails.get('expected_gold').value
              };
    this.orderDetails.unshift(this.item);
    // clearing the form

    this.orderFormDetails.get('product_code').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('customer_category_id').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('lc').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('ploss').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('product_mv').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('qty').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('expected_gold').patchValue(null, { onlySelf: true });
    this.orderFormDetails.reset();
    this.selectedProduct=null;

  }
}
