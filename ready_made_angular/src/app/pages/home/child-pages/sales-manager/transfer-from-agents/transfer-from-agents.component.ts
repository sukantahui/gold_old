import { Component, OnInit } from '@angular/core';
import {TransferAgentService} from '../../../../../services/transfer-agent.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../../../../models/product.model';
import {Sort} from '@angular/material/sort';
import Swal from "sweetalert2";

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
  constructor(private transferAgentService: TransferAgentService) { }

  ngOnInit(): void {
    this.transferForm = new FormGroup({
      agent_id: new FormControl(null),
      short_name: new FormControl(null)
    });
    this.transferAgentService.getAgentsUpdateListener().subscribe((response) => {
      this.agents = response;
      console.log(this.agents);
    });
    this.transferAgentService.getCounterAgentData().subscribe((response: {status: any , data: any}) => {
      this.counterAgentId =  response.data.agent_id;
    });
  }
  getStockByAgent(){
    this.transferAgentService.getProductsByAgentId(this.transferForm.value.agent_id)
        .subscribe((response: {status: any , data: Product[]}) => {
          this.productByAgentList = response.data;
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
    // const data = this.products.slice();
    // if (!sort.active || sort.direction === '') {
    //   this.sortedProducts = data;
    //   return;
    // }
    // this.sortedProducts = data.sort((a, b) => {
    //   const isAsc = sort.direction === 'asc';
    //   const isDesc = sort.direction === 'desc';
    //   switch (sort.active) {
    //     case 'tag': return compare(a.tag, b.tag, isAsc);
    //     case 'model': return compare(a.model_no, b.model_no, isAsc);
    //     case 'selected': return compare(String(a.is_selected), String(b.is_selected), isDesc);
    //     case 'size': return compare(a.model_size, b.model_size, isAsc);
    //     case 'quantity': return compare(a.qty, b.qty, isAsc);
    //     default: return 0;
    //   }
    // });
  }
  selectForTransfer(){
    const newArray = this.productByAgentList.filter((el) => el.is_selected);
    this.productByAgentList = this.productByAgentList.filter(ar => !newArray.find(rm => (rm.tag === ar.tag )));
    this.selectedProducts.push(...newArray);
    console.log(this.selectedProducts);
  }
  isAnyAvailableProductSelected() {
    // const count = this.productByAgentList.filter(obj => obj.is_selected).length;
    const count = this.productByAgentList.filter(obj => obj.is_selected).length;
    return count > 0;
  }
  transferToAgent() {
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
        swalWithBootstrapButtons.fire({
          timer: 2000,
          // timerProgressBar: true,
          title: 'Transferred',
          text: 'Product transferred successfully',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#1661a0',
          cancelButtonColor: '#d33',
          background: 'rgba(38,39,47,0.95)'
        });
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
}
