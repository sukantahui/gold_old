import { Component, OnInit } from '@angular/core';
import {StockService} from '../../../../../services/stock.service';
import {FormGroup} from '@angular/forms';
import Swal from "sweetalert2";
import {Stock} from '../../../../../models/stock.model';
import {Product} from '../../../../../models/product.model';


@Component({
  selector: 'app-stock-entry',
  templateUrl: './stock-entry.component.html',
  styleUrls: ['./stock-entry.component.scss']
})
export class StockEntryComponent implements OnInit {
  stockForm: FormGroup;
  productList: Product[] = [];
  stockList: Stock[] = [];
  jobList: any[] = [];
  labourCharge: any;
  model_number: any;
  model_size: any;
  bill_no: any;
  searchTerm: any;
  pageSize = 5;
  currentPageProducts = 1;
  searchTermSelectedProducts: any;
  pageSizeSelectedProducts = 50;
  currentPageSelectedProducts = 1;
  constructor(private stockService: StockService) {
    this.productList = this.stockService.getProductList();
    this.stockList =  this.stockService.getStockList();
    this.jobList =  this.stockService.getJobList();
  }

  ngOnInit(): void {
    this.stockForm = this.stockService.stockForm;
    this.stockService.getProductsUpdateListener().subscribe((response) => {
      this.productList = response;
    });
    this.stockService.getStocksUpdateListener().subscribe((response) => {
      this.stockList = response;
    });
    this.stockService.getJobsUpdateListener().subscribe((response) => {
      this.jobList = response;
    });
  }
  getLabourCharge(){
    this.stockService.getPriceByModelNumber().subscribe((response: {status: any , data: any}) => {
      if (response.status === true){
        this.labourCharge =  response.data.price;
        this.stockForm.patchValue({labour_charge: this.labourCharge});
      }
    });
  }
  onSubmit(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
        title: 'text-white',
      },
      buttonsStyling: true,
    });
    Swal.fire({
      title: 'Stock Entry',
      text: 'Are you sure to add stock?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, add',
      cancelButtonText: 'No!',
      background: 'rgba(38,39,47,0.95)'
    }).then((result) => {
      if (result.value){
        this.stockService.saveStock().subscribe((response: {status: any , data: Stock}) => {
          Swal.fire({
            timer: 2000,
            title: 'Saved',
            text: 'Stock added successfully',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#1661a0',
            cancelButtonColor: '#d33',
            background: 'rgba(38,39,47,0.95)'
          });
          if (response.status === true){
            // this.stockList.unshift(response.data);
            this.stockForm.reset();
            this.stockForm.patchValue({in_stock: 1 , agent_id: 'AG2018'});
          }
        }, error => {
          Swal.fire({
            title: error.message,
            text: 'Stock is not added',
            icon: 'error',
            showConfirmButton: false,
            background: 'rgba(38,39,47,0.95)',
            timer: 3000
          });
        });
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
            'Cancelled',
        );
      }
    });
  }
  getDetails(){
    this.stockService.getDetailsByJobId().subscribe((response: {status: any , data: any}) => {
      if (response.status === true){
          this.model_number =  response.data.product_code;
          this.model_size =  response.data.product_size;
          this.labourCharge =  response.data.price;
          this.bill_no = response.data.bill_no;
          this.stockForm.patchValue({model_no: this.model_number, model_size: this.model_size, labour_charge: this.labourCharge, bill_no: this.bill_no});
      }
    });
  }
}
