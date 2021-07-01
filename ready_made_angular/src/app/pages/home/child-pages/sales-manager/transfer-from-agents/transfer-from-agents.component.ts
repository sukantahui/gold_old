import { Component, OnInit } from '@angular/core';
import {TransferAgentService} from '../../../../../services/transfer-agent.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../../../../models/product.model';
import {Sort} from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transfer-from-agents',
  templateUrl: './transfer-from-agents.component.html',
  styleUrls: ['./transfer-from-agents.component.scss']
})
export class TransferFromAgentsComponent implements OnInit {

  agents: any[] = [];
  productByAgentList: Product[] = [];
  selectedProducts: Product[] = [];
  transferForm: FormGroup;
  searchTerm: any;
  counterAgentId: any;
  pageSize = 50;
  currentPageProducts = 1;
  searchTermSelectedProducts: any;
  pageSizeSelectedProducts = 50;
  currentPageSelectedProducts = 1;
  color = 'accent';
  checked = false;
  checkedAvailableAllProducts = false;
  checkedTransferableAllProducts = false;
  sortedProductByAgentList: Product[] = [];
  constructor(private transferAgentService: TransferAgentService) { }

  ngOnInit(): void {
    this.transferForm = new FormGroup({
      agent_id: new FormControl(null),
      short_name: new FormControl(null)
    });
    this.transferAgentService.getAgentsUpdateListener().subscribe((response) => {
      this.agents = response;
    });
    this.transferAgentService.getCounterAgentData().subscribe((response: {status: any , data: any}) => {
      this.counterAgentId =  response.data.agent_id;
    });
  }
  getStockByAgent(){
    this.transferAgentService.getProductsByAgentId(this.transferForm.value.agent_id)
        .subscribe((response: {status: any , data: Product[]}) => {
          this.productByAgentList = response.data;
          this.sortedProductByAgentList = response.data;
    });
  }
  changeProductSlideToggle(){

  }
  countSelectedAvailableProduct(){
    // return this.productByAgentList.filter(obj => obj.is_selected).length;
    // @ts-ignore
    // return this.productByAgentList.filter(obj => obj.is_selected).length;
  }
  sortData(sort: Sort) {
    const data = this.productByAgentList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedProductByAgentList = data;
      return;
    }
    this.sortedProductByAgentList = data.sort((a, b) => {
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
  }
  selectForTransfer(){
    const newArray = this.productByAgentList.filter((el) => el.is_selected);
    this.productByAgentList = this.productByAgentList.filter(ar => !newArray.find(rm => (rm.tag === ar.tag )));
    this.selectedProducts.push(...newArray);
    // also removing from sortedArray
    this.sortedProductByAgentList = this.sortedProductByAgentList.filter(ar => !newArray.find(rm => (rm.tag === ar.tag )));
  }
  isAnyAvailableProductSelected() {
    // const count = this.productByAgentList.filter(obj => obj.is_selected).length;
    const count = this.productByAgentList.filter(obj => obj.is_selected).length;
    return count > 0;
  }
  transferFromAgent() {
    const agent_id = this.counterAgentId;
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
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
            );
          }
        });


        // swalWithBootstrapButtons.fire({
        //   timer: 2000,
        //   // timerProgressBar: true,
        //   title: 'Transferred',
        //   text: 'Product transferred successfully',
        //   icon: 'success',
        //   showCancelButton: false,
        //   confirmButtonColor: '#1661a0',
        //   cancelButtonColor: '#d33',
        //   background: 'rgba(38,39,47,0.95)'
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

  sendProduct(selectedProduct: Product) {
    const indexSortedProducts = this.sortedProductByAgentList.findIndex(x => x.tag === selectedProduct.tag);
    const product = this.sortedProductByAgentList[indexSortedProducts];
    this.selectedProducts.unshift(product);
    this.sortedProductByAgentList.splice(indexSortedProducts, 1);

    const indexProducts = this.productByAgentList.findIndex(x => x.tag === selectedProduct.tag);
    this.productByAgentList.splice(indexProducts, 1);
  }

  deleteFromSelectedProducts(item: Product) {
    const index =  this.selectedProducts.findIndex(x => x.tag === item.tag);
    this.selectedProducts.splice(index, 1);
    item.is_selected = false;
    this.sortedProductByAgentList.unshift(item);
    this.productByAgentList.unshift(item);
  }
} // end of class

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

