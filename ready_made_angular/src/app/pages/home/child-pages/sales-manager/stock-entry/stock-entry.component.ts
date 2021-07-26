import { Component, OnInit } from '@angular/core';
import {StockService} from '../../../../../services/stock.service';
import {FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {Stock} from '../../../../../models/stock.model';
import {Product} from '../../../../../models/product.model';
import {DateFormat} from '../../../../../date-format';
import {formatDate} from '@angular/common';
import {Sort} from '@angular/material/sort';
import {CommonService} from '../../../../../services/common.service';


@Component({
  selector: 'app-stock-entry',
  templateUrl: './stock-entry.component.html',
  styleUrls: ['./stock-entry.component.scss']
})
export class StockEntryComponent implements OnInit {
  stockForm: FormGroup;
  productList: Product[] = [];
  stockList: Stock[] = [];
  sortedStockList: any[] = [];
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
  isSaveEnabled = true;
  currDate = new Date();
  resultDate = [];
  formattedCurrentDate = formatDate(this.currDate , 'yyyy-MM-dd', 'en');
  constructor(private stockService: StockService, private  commonService: CommonService) {
    this.productList = this.stockService.getProductList();
    this.stockList =  this.stockService.getStockList();
    this.jobList =  this.stockService.getJobList();
  }

  ngOnInit(): void {
    this.stockForm = this.stockService.stockForm;
    this.isSaveEnabled = true;
    this.stockService.getStocksUpdateListener().subscribe((response) => {
      this.stockList = response;
      this.sortedStockList =  this.stockList.slice();
      this.resultDate = this.stockList.filter(x => x.date === this.formattedCurrentDate);
    });
    this.stockService.getJobsUpdateListener().subscribe((response) => {
      this.jobList = response;
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
          if (response.status === true) {
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
            response.data.date = this.formattedCurrentDate;
            this.isSaveEnabled = false;
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
          console.log(response.data.product_code);
          this.model_number =  response.data.product_code;
          this.model_size =  response.data.product_size;
          this.labourCharge =  response.data.price;
          this.bill_no = response.data.bill_no;
        // tslint:disable-next-line:max-line-length
          this.stockForm.patchValue({modelNo: this.model_number, modelSize: this.model_size, labourCharge: this.labourCharge, billNo: this.bill_no});
      }
    });
  }
  increaseTag(){
    const tagLength = this.stockForm.value.tag.length;
    const increasedValue = (Number)(this.stockForm.value.tag.slice(1, tagLength )) + 1;
    const remTag = this.stockForm.value.tag.slice(0, 1);
    const newTag = remTag + increasedValue ;
    this.stockForm.patchValue({tag: newTag});
    this.isSaveEnabled = true;
  }
  clear(){
    this.stockForm.reset();
    this.stockForm.patchValue({in_stock: 1 , agent_id: 'AG2018', employee_id: 46});
    this.isSaveEnabled = true;
  }
  // sortData(sort: Sort){
  //   const data = this.stockList.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedStockList = data;
  //     return;
  //   }
  //   this.sortedStockList = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     const isDesc = sort.direction === 'desc';
  //     switch (sort.active) {
  //       case 'tag': return compare(a.tag, b.tag, isAsc);
  //       // case 'model_no': return compare(a.model_no, b.model_no, isAsc);
  //       case 'model_size': return compare(a.model_size, b.model_size, isAsc);
  //       case 'gold': return compare(a.gold, b.gold, isAsc);
  //       case 'labour_charge': return compare(a.labour_charge, b.labour_charge, isAsc);
  //       case 'gross_weight': return compare(a.gross_weight, b.gross_weight, isAsc);
  //       case 'quantity': return compare(a.quantity, b.quantity, isAsc);
  //       case 'package_weight': return compare(a.package_weight, b.package_weight, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

  sortData(sort: Sort){
    const data = this.stockList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedStockList = data;
      return;
    }
    this.sortedStockList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const isDesc = sort.direction === 'desc';
      switch (sort.active) {
        case 'tag': return this.commonService.compare(a.tag, b.tag, isAsc);
          // case 'model_no': return compare(a.model_no, b.model_no, isAsc);
        case 'model_size': return this.commonService.compare(a.model_size, b.model_size, isAsc);
        case 'gold': return this.commonService.compare(a.gold, b.gold, isAsc);
        case 'labour_charge': return this.commonService.compare(a.labour_charge, b.labour_charge, isAsc);
        case 'gross_weight': return this.commonService.compare(a.gross_weight, b.gross_weight, isAsc);
        case 'quantity': return this.commonService.compare(a.quantity, b.quantity, isAsc);
        case 'package_weight': return this.commonService.compare(a.package_weight, b.package_weight, isAsc);
        default: return 0;
      }
    });
  }
}
// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
