import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../../../services/common.service';
import {formatDate} from '@angular/common';
import {AgentService} from '../../../../../services/agent.service';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../../../../services/product.service';
import {CustomerCategoryService} from '../../../../../services/customer-category.service';
import {PriceMaster} from '../../../../../models/price-master.model';
import { faUserEdit, faTrashAlt, faPencilAlt, faPrint, faCogs} from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {StorageMap} from '@ngx-pwa/local-storage';
import {OrderService} from '../../../../../services/order.service';
import {environment} from "../../../../../../environments/environment";

export interface Item{
  product_code: string;
  selectedProduct: any;
  price_code: string;
  cust_category_id: number;
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
  orderMaster: {cust_id: string, agent_id: string, cust_mv: number, order_date: string, delivery_date: string, lc_discount_percentage: number};
  item: Item;
  orderDetails: Item[] = [];
  orderMasterList: any[] = [];
  expectedGold: any;
  viewDetails= false;
  orderDetailsList: any;
  customerName: any;
  orderMasterListOfDetails: any[] = [];
  printAbleOrderDetails: {order_details: any[],customer: any,order_master: any};
  faUserEdit = faUserEdit;
  faTrashAlt = faTrashAlt;
  faPencilAlt = faPencilAlt;
  faCogs = faCogs;
  faPrint = faPrint;
  faCheck = faCheck;

  isProduction = environment.production; // for showing it only in development phase not in build phase



  constructor(private commonService: CommonService, private agentService: AgentService, private http: HttpClient, private productService: ProductService, private customerCategoryService: CustomerCategoryService, private storage: StorageMap , private  orderService: OrderService) {
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
      lc_discount_percentage: new FormControl(null, [Validators.required]),
    });
    this.orderFormDetails = new FormGroup({
      product_code: new FormControl(null, [Validators.required]),
      customer_category_id: new FormControl(null, [Validators.required]),
      lc: new FormControl(null, [Validators.required]),
      ploss: new FormControl(null, [Validators.required]),
      product_mv: new FormControl(null, [Validators.required]),
      qty: new FormControl(null, [Validators.required]),
      expected_gold: new FormControl(null, [Validators.required]),
      rm_id: new FormControl(48, [Validators.required]),
      product_size: new FormControl(null, [Validators.required])
    });
  }

  printDivStyle = {
    table: {'border-collapse': 'collapse', 'width' : '100%' },
    label:{'width': '100%'},
    th: {border: '1px  solid black' , 'fontSize' : 'small'},
    td: {border: '1px  solid black' , 'fontSize' : 'small'},

};
  searchTerm: any;
  pageSize = 50;

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
      if (!orderDetails){
        this.orderDetails = [];
      }else{
        this.orderDetails = orderDetails;
      }
    }, (error) => {
      console.log(error);
    });
    this.storage.get('orderMaster').subscribe((orderMaster: any) => {
      if (orderMaster){
        this.orderFormMaster.get('agent_id').patchValue(orderMaster.agent_id, { onlySelf: true });
        this.agentSelected();
        this.orderFormMaster.get('cust_id').patchValue(orderMaster.cust_id, { onlySelf: true });
        this.orderMaster = {
          cust_id: this.orderFormMaster.get('cust_id').value,
          agent_id: this.orderFormMaster.get('agent_id').value,
          cust_mv: this.orderFormMaster.get('cust_mv').value,
          order_date: this.orderFormMaster.get('order_date').value,
          delivery_date: this.orderFormMaster.get('delivery_date').value,
          lc_discount_percentage: this.orderFormMaster.get('lc_discount_percentage').value,
        };
      }
    });
  }


  agentSelected() {
    const agent_id = this.orderFormMaster.get('agent_id').value;
    this.orderFormMaster.get('cust_id').patchValue(null, { onlySelf: true });
    this.orderFormMaster.get('cust_mv').patchValue(null, { onlySelf: true });
    // tslint:disable-next-line:max-line-length
    this.http.get(this.commonService.getAPI() + '/dev/customers/agent/' + agent_id + '/inforced').subscribe((response: {success: number , data: any[]}) => {
      this.customers =  response.data;
    });
  }

  customerSelected($event) {
    this.selectedCustomer = $event;
    // this.orderMaster.cust_id=this.selectedCustomer.cust_id;
    console.log(this.selectedCustomer);
    console.log('customerSelected');
    this.orderFormMaster.get('cust_mv').patchValue(this.selectedCustomer.markup_value, { onlySelf: true });
    this.orderFormMaster.get('lc_discount_percentage').patchValue(this.selectedCustomer.lc_discount_percentage, { onlySelf: true });
    this.orderMaster = {
      cust_id: this.orderFormMaster.get('cust_id').value,
      agent_id: this.orderFormMaster.get('agent_id').value,
      cust_mv: this.orderFormMaster.get('cust_mv').value,
      order_date: this.orderFormMaster.get('order_date').value,
      delivery_date: this.orderFormMaster.get('delivery_date').value,
      lc_discount_percentage: this.orderFormMaster.get('lc_discount_percentage').value

    };
    this.storage.set('orderMaster', this.orderMaster).subscribe(() => {});
  }

  productSelected(val) {
    this.selectedProduct = val;
    this.orderFormDetails.get('customer_category_id').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('lc').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('ploss').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('product_mv').patchValue(null, { onlySelf: true });
  }

  customerCategorySelected($event: any) {
    if ($event != null){
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
    this.item = {
                product_code: this.orderFormDetails.get('product_code').value,
                selectedProduct: this.selectedProduct,
                price_code: this.selectedProduct.price_code,
                cust_category_id: this.orderFormDetails.get('customer_category_id').value,
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
    this.orderDetails.push(this.item);
    // clearing the form

    this.orderFormDetails.get('product_code').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('customer_category_id').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('lc').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('ploss').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('product_mv').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('qty').patchValue(null, { onlySelf: true });
    this.orderFormDetails.get('expected_gold').patchValue(null, { onlySelf: true });
    this.orderFormDetails.reset();
    this.orderFormDetails.get('rm_id').setValue(48);
    this.selectedProduct = null;
    this.storage.set('orderDetails', this.orderDetails).subscribe(() => {});

  }

  populateOrderFormDetails(row: Item, i: any) {
    this.orderFormDetails.patchValue({
      product_code: row.product_code,
      customer_category_id: row.cust_category.ID,
      lc: row.lc,
      ploss: row.ploss,
      product_mv: row.product_mv,
      product_size: row.product_size,
      expected_gold: row.expected_gold,
      rm_id: row.rm_id,
      qty: row.qty,
    });
    this.selectedProduct = row.selectedProduct;
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

  clearOrder() {
    this.storage.delete('orderDetails').subscribe(() => {
      this.orderDetails = [];
    });
    this.storage.delete('orderMaster').subscribe(() => {
      this.orderFormMaster.get('cust_id').patchValue(null, { onlySelf: true });
      this.orderFormMaster.get('cust_mv').patchValue(null, { onlySelf: true });
      this.orderFormMaster.get('agent_id').patchValue(null, { onlySelf: true });
    });
  }

  getExpectedGoldDecimalValue(){
    if (this.orderFormDetails.get('expected_gold').value.length >= 3){
      this.expectedGold = this.orderFormDetails.get('expected_gold').value / 1000;
    }
    else {
      this.expectedGold = this.orderFormDetails.get('expected_gold').value;
    }
    this.orderFormDetails.get('expected_gold').patchValue( this.expectedGold, { onlySelf: true });
  }

  saveOrder() {
    const tempoOrderDetails = this.orderDetails.map(
        // tslint:disable-next-line:max-line-length
        ({product_code, price_code, rm_id, product_size, expected_gold, qty, total_mv, ploss, cust_category_id , lc}) => ({product_code, price_code, rm_id, product_size, expected_gold, qty, total_mv, ploss, cust_category_id, lc})
    );

    this.orderService.saveOrder(this.orderMaster, tempoOrderDetails)
        .subscribe((response: {status: any , data: any}) => {
            if (response.status === true){
              Swal.fire({
                title: 'Done',
                text: 'Order saved successfully',
                icon: 'success'
              });
              this.orderService.getOrderMasterList(this.pageSize).subscribe((response:{status:any, data:any[]})=>{
                this.orderMasterList = response.data;
              });

              this.storage.delete('orderDetails').subscribe(() => {
                this.orderDetails = [];
              });
              this.storage.delete('orderMaster').subscribe(() => {
                this.orderFormMaster.reset();
              });

            }
        });
  }

  viewOrderList(){
    this.orderService.getOrderMasterList(this.pageSize).subscribe((response:{status:any, data:any[]})=>{
      this.orderMasterList = response.data;
    });

  }

  viewOrderDetailsByOrderMaster(orderId){
    this.orderService.getOrderDetailsByOrderMaster(orderId).subscribe((response:{status:any, data:any})=>{
      // this.orderDetailsList = response.data.order_details;
      // this.customerName = response.data.customer;
      // this.orderMasterListOfDetails = response.data.order_master;
      this.printAbleOrderDetails = response.data;
      this.viewDetails = true;
    });
  }


}
