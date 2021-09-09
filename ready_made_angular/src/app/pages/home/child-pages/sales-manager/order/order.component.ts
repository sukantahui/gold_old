import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../../../services/common.service';
import {formatDate} from '@angular/common';
import {AgentService} from '../../../../../services/agent.service';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../../../../services/product.service';
import {CustomerCategoryService} from '../../../../../services/customer-category.service';
import {PriceMaster} from "../../../../../models/price-master.model";
import { faUserEdit, faTrashAlt, faPencilAlt, faPrint} from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {StorageMap} from "@ngx-pwa/local-storage";

export interface Item{
  product_code: string;
  price_code: string;
  cust_category: any;
  lc: number;
  ploss: number;
  product_mv: number;
  total_mv: number;
  cust_mv: number;
  qty: number;
  expected_gold: number;
  rm_id: number;
  product_size: string;
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
  orderMaster: {cust_id: string, agent_id: string, cust_mv: number, order_date: string, delivery_date: string};
  item: Item;
  orderDetails: Item[] = [];

  faUserEdit = faUserEdit;
  faTrashAlt = faTrashAlt;
  faPencilAlt = faPencilAlt;
  faPrint = faPrint;
  faCheck = faCheck;


  constructor(private commonService: CommonService, private agentService: AgentService, private http: HttpClient, private productService: ProductService, private customerCategoryService: CustomerCategoryService, private storage: StorageMap) {
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
      expected_gold: new FormControl(null, [Validators.required]),
      rm_id: new FormControl(48, ),
      product_size: new FormControl(null, [Validators.required])
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
    this.storage.get('orderDetails').subscribe((orderDetails: Item[]) => {
      this.orderDetails = orderDetails;
    });
    this.storage.get('orderMaster').subscribe((orderMaster: any) => {
      this.orderMaster = orderMaster;
    });
  }


  setOrderMaster(){
    this.orderMaster = {
      cust_id: this.orderFormMaster.get('cust_id').value,
      agent_id: this.orderFormMaster.get('agent_id').value,
      cust_mv: this.orderFormMaster.get('cust_mv').value,
      order_date: this.orderFormMaster.get('order_date').value,
      delivery_date: this.orderFormMaster.get('delivery_date').value
    };
    this.storage.set('orderMaster', this.orderFormMaster).subscribe(() => {});
  }


  agentSelected() {
    this.setOrderMaster();
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
                price_code: this.selectedProduct.price_code,
                cust_category: this.selectedCustomerCategory,
                lc: this.orderFormDetails.get('lc').value,
                ploss: this.orderFormDetails.get('ploss').value,
                product_mv: this.orderFormDetails.get('product_mv').value,
                cust_mv: this.orderFormMaster.get('cust_mv').value,
                total_mv: (this.orderFormDetails.get('product_mv').value + this.orderFormMaster.get('cust_mv').value),
                qty: this.orderFormDetails.get('qty').value,
                expected_gold: this.orderFormDetails.get('expected_gold').value,
                product_size: this.orderFormDetails.get('product_size').value,
                rm_id: this.orderFormDetails.get('rm_id').value
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
    this.storage.set('orderDetails', this.orderDetails).subscribe(() => {});

  }

  populateOrderFormDetails(row: Item, i: any) {
    this.orderFormDetails.patchValue({
      product_code: row.product_code
    });
  }

  deleteItem(i: any) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure to delete ',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,Delete It!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderDetails.splice(i, 1);
      }
    });
  }
}
