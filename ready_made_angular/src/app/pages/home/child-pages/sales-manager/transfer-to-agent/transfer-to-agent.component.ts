import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {TransferAgentService} from '../../../../../services/transfer-agent.service';
import {Product} from '../../../../../models/product.model';
import {Sort} from '@angular/material/sort';
import Swal from 'sweetalert2';
import { BaseRowDef } from '@angular/cdk/table';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ServerResponse} from '../../../../../models/ServerResponse.model';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {StockService} from '../../../../../services/stock.service';
import {CommonService} from '../../../../../services/common.service';
import {Subject} from 'rxjs';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-transfer-to-agent',
  templateUrl: './transfer-to-agent.component.html',
  styleUrls: ['./transfer-to-agent.component.scss'],

})
export class TransferToAgentComponent implements OnInit {
  agents: any[] = [];
  products: Product[] = [];
  selectedProducts: any[] = [];
  transferForm: FormGroup;
  disabled: any;
  searchTerm: any;
  searchTag: any;
  pageSize = 50;
  currentPageProducts = 1;
  searchTermSelectedProducts: any;
  pageSizeSelectedProducts = 50;
  currentPageSelectedProducts = 1;
  color = 'accent';
  checked = false;
  checkedAvailableAllProducts = false;
  checkedTransferableAllProducts = false;
  currentDate = new Date();
  public sortedProducts: Product[] = [];
  selectAgentReadyMadeBalance: {agentId: string, gold: number, lc: number, qty: number, sets: number};
  selectedAgent: { 'agent_id': string, 'short_name': string, 'agent_name': string, max_gold_limit_ready_made } = null;
  finalSelectedGoldTotal = 0;
  stoockListByAgent: any[];
  stockListByAgentChangeSubject = new Subject<any[]>();
  isProduction = environment.production;


  constructor(public transferAgentService: TransferAgentService, private stockService: StockService, public commonService: CommonService) {
    this.products = this.transferAgentService.getProductsInCounter();
    this.agents = this.transferAgentService.getAgentsWithoutCounter();
    this.sortedProducts = this.products.slice();
    this.transferForm = new FormGroup({
      agentId: new FormControl(null),
      shortName: new FormControl(null)
    });
    this.stockListByAgentChangeSubject.asObservable().subscribe((response) => {
      console.log('change detected is stockListByAgent');
      // tslint:disable-next-line:max-line-length
      this.selectAgentReadyMadeBalance.gold = this.stoockListByAgent.reduce((accumulator: number, currentValue) => accumulator + parseFloat(currentValue.gold), 0);
      // tslint:disable-next-line:max-line-length
      this.selectAgentReadyMadeBalance.qty = this.stoockListByAgent.reduce((accumulator: number, currentValue) => accumulator + parseFloat(currentValue.quantity), 0);
      // tslint:disable-next-line:max-line-length
      this.selectAgentReadyMadeBalance.lc = this.stoockListByAgent.reduce((accumulator: number, currentValue) => accumulator + parseFloat(currentValue.labourCharge), 0);
    });
  }

  ngOnInit(): void {
    this.transferAgentService.getAgentsUpdateListener().subscribe(response => {
      this.agents = response;
    });
    this.transferAgentService.getProductsUpdateListener().subscribe(response => {
      this.products = response;
      this.sortedProducts = this.products.slice();
    });
  }

  selectForTransfer() {
    const newArray = this.sortedProducts.filter((el) => el.is_selected);
    this.sortedProducts = this.sortedProducts.filter(ar => !newArray.find(rm => (rm.tag === ar.tag )));
    this.products = this.products.filter(ar => !newArray.find(rm => (rm.tag === ar.tag )));
    this.selectedProducts.push(...newArray);
    this.finalSelectedGoldTotal = this.selectedProducts.reduce((accumulator: number, currentValue) => accumulator + parseFloat(currentValue.gold), 0);
  }

  // sendProduct(selectedProduct: any) {
  //   const indexSortedProducts = this.sortedProducts.findIndex(x => x.tag === selectedProduct.tag);
  //   const product = this.sortedProducts[indexSortedProducts];
  //   this.selectedProducts.unshift(product);
  //   this.sortedProducts.splice(indexSortedProducts, 1);
  //
  //   const indexProducts = this.products.findIndex(x => x.tag === selectedProduct.tag);
  //   this.products.splice(indexProducts, 1);
  // }

  changeProductSlideToggle() {
    if (this.checkedAvailableAllProducts) {
      this.sortedProducts = this.sortedProducts.map(item => {
        item.is_selected = true;
        return item;
      });
    }else{
      this.sortedProducts = this.sortedProducts.map(item => {
        item.is_selected = false;
        return item;
      });
    }
  }

  changeTransferableProductSlideToggle() {
    this.checkedTransferableAllProducts = !this.checkedTransferableAllProducts;
    if (this.checkedTransferableAllProducts) {
      this.selectedProducts = this.selectedProducts.map(item => {
        item.is_selected = true;
        return item;
      });
    }else{
      this.selectedProducts = this.selectedProducts.map(item => {
        item.is_selected = false;
        return item;
      });
    }
  }

  isAnyAvailableProductSelected() {
    const count = this.sortedProducts.filter(obj => obj.is_selected).length;
    return count > 0;
  }
  countSelectedAvailableProduct(){
    return this.sortedProducts.filter(obj => obj.is_selected).length;
  }

  sortData(sort: Sort) {
    const data = this.products.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedProducts = data;
      return;
    }
    this.sortedProducts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const isDesc = sort.direction === 'desc';
      switch (sort.active) {
        case 'tag': return compare(a.tag, b.tag, isAsc);
        case 'model': return compare(a.model_no, b.model_no, isAsc);
        case 'selected': return compare(String(a.is_selected), String(b.is_selected), isDesc);
        case 'size': return compare(a.model_size, b.model_size, isAsc);
        case 'quantity': return compare(a.qty, b.qty, isAsc);
        default: return 0;
      }
    });
  }// end of sortData

  getSelectedAgentName(){
    const agent_id = this.transferForm.get('agentId').value;
    if (agent_id === null){
      return '';
    }
    const agent = this.agents.find(x => x.agent_id === agent_id);
    return agent.agent_name;
  }

  transferToAgent() {
    const agent_id = this.transferForm.get('agentId').value;
    const tags = this.selectedProducts.map(t => t.tag.toString());
    this.transferAgentService.transferProduct(agent_id, tags).subscribe((response: {status: any, data: any}) => {
      if (response.status === true){
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
            title: 'text-white',
          },
          buttonsStyling: true,
        });


        Swal.fire({
          title: 'Transfer',
          text: 'Are you sure to transfer?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, transfer',
          cancelButtonText: 'No!',
          background: 'rgba(38,39,47,0.95)'
        }).then((result) => {
          if (result.value) {
            Swal.fire({
              timer: 2000,
              title: 'Transferred',
              text: 'Product transferred successfully',
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#1661a0',
              cancelButtonColor: '#d33',
              background: 'rgba(38,39,47,0.95)'
            }) ;

            // tslint:disable-next-line:no-shadowed-variable
            this.transferAgentService.getAgentReadyMadeBalance(this.selectedAgent.agent_id).subscribe((response: ServerResponse) => {
              this.selectAgentReadyMadeBalance = response.data;
            });
            this.selectedProducts = [];
            this.finalSelectedGoldTotal = 0;
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
            );
          }
        });



        // swalWithBootstrapButtons.fire({

          // timerProgressBar: true,
          // timer: 2000,

          // title: 'Transferred',
          // text: 'Product transferred successfully',
          // icon: 'success',
          // showCancelButton: false,
          // confirmButtonColor: '#1661a0',
          // cancelButtonColor: '#d33',
          // background: 'rgba(38,39,47,0.95)'

        // });
        this.selectedProducts = [];
      }
    }, (error) => {
      Swal.fire({
        title: error.message,
        text: 'Product is not transferred',
        icon: 'error',
        showConfirmButton: false,
        background: 'rgba(38,39,47,0.95)',
        timer: 3000
      });
    });
  }


  // transferToAgent() {
  //   const agent_id = this.transferForm.get('agentId').value;
  //   const tags = this.selectedProducts.map(t => t.tag.toString());
  //   this.transferAgentService.transferProduct(agent_id, tags).subscribe((response: {status: any, data: any}) => {
  //     if (response.status === true){
  //       //using primeng confirmationService
  //       this.confirmationService.confirm({
  //         message: 'Are you sure that you want to proceed?',
  //         header: 'Confirmation',
  //         icon: 'pi pi-exclamation-triangle',
  //             accept: () => {
  //             // //using primeng messageService
  //                 this.messageService.clear();
  //                 this.messageService.add({
  //                   severity: 'success',
  //                   summary: 'Success Message',
  //                   detail: 'Stock transferred successfully'
  //                 });
  //               },
  //         reject: () => {}
  //       });
  //       this.selectedProducts = [];
  //     }
  //   },(error) => {
  //    this.messageService.clear();
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'error Message',
  //       detail: error.error.response.message
  //     });
  //   });
  // }

  deleteFromSelectedProducts(item){
    const index =  this.selectedProducts.findIndex(x => x.tag === item.tag);
    this.selectedProducts.splice(index, 1);
    item.is_selected = false;
    this.sortedProducts.unshift(item);
    this.products.unshift(item);
    // tslint:disable-next-line:max-line-length
    this.finalSelectedGoldTotal = this.selectedProducts.reduce((accumulator: number, currentValue) => accumulator + parseFloat(currentValue.gold), 0);
  }
  selectForDirectTagTransfer(){
    if (this.searchTag.length == 0) {
      return;
    }

    const newArray = this.sortedProducts.filter(el => el.tag == this.searchTag.toUpperCase());
    if (newArray.length === 0){
      Swal.fire( {
            title: 'Not found',
            text: 'No element of the tag found',
            showConfirmButton: false,
            timer: 2000
       });
    }else{
      this.sortedProducts = this.sortedProducts.filter(ar => !newArray.find(rm => (rm.tag === ar.tag )));
      this.products = this.products.filter(ar => !newArray.find(rm => (rm.tag === ar.tag )));
      this.selectedProducts.push(...newArray);
      this.selectedProducts.filter(el => el.is_selected = true);
      // tslint:disable-next-line:max-line-length
      this.finalSelectedGoldTotal = this.selectedProducts.reduce((accumulator: number, currentValue) => accumulator + parseFloat(currentValue.gold), 0);
    }


  }

    onAgentSelect(agent: any) {
      if (agent === undefined){
          this.selectedAgent = null;
          this.stoockListByAgent = null;
      }else{
          this.selectedAgent = agent;
          this.transferAgentService.getAgentReadyMadeBalance(agent.agent_id).subscribe((response: ServerResponse) => {
              this.selectAgentReadyMadeBalance = response.data;
          });
          this.stockService.getStockByAgent(agent.agent_id)
            .subscribe((response: {status: any , data: any[]}) => {
              this.stoockListByAgent = response.data;
              this.stockListByAgentChangeSubject.next();
            });
      }
    }

  onStockItemSelectionChange($event: MatCheckboxChange, product: any) {
    console.log($event);
    console.log(product);
  }


  onSelectedProductSelectionChange($event: MatCheckboxChange, product: any) {
    console.log($event);
  }
}// end of class

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
