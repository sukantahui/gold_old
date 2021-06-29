import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {TransferAgentService} from '../../../../../services/transfer-agent.service';
import {Product} from "../../../../../models/product.model";

@Component({
  selector: 'app-transfer-to-agent',
  templateUrl: './transfer-to-agent.component.html',
  styleUrls: ['./transfer-to-agent.component.scss']
})
export class TransferToAgentComponent implements OnInit {
  agents: any[] = [];
  products: Product[] = [];
  selectedProducts: any[] = [];
  transferForm: FormGroup;
  disabled: any;
  searchTerm: any;
  pageSize = 50;
  currentPageProducts = 1;
  searchTermSelectedProducts: any;
  pageSizeSelectedProducts = 50;
  currentPageSelectedProducts = 1;
  color = 'accent';
  checked = false;
  checkedAvailableAllProducts = false;
  checkedTransferableAllProducts = false;
  constructor(public transferAgentService: TransferAgentService) {
    this.products = this.transferAgentService.getProductsInCounter();
    this.transferForm = new FormGroup({
      agent_id: new FormControl(null),
      short_name: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.transferAgentService.getAgentsUpdateListener().subscribe(response => {
      this.agents = response;
    });
    this.transferAgentService.getProductsUpdateListener().subscribe(response => {
      this.products = response;
    });
  }

  selectForTransfer() {
    const newArray = this.products.filter((el) => el.is_selected);
    this.products = this.products.filter(ar => !newArray.find(rm => (rm.tag === ar.tag )));
    this.selectedProducts.push(...newArray);
  }

  sendProduct(selectedProduct: any) {
    const index = this.products.findIndex(x => x.tag === selectedProduct.tag);
    const product = this.products[index];
    this.selectedProducts.unshift(product);
    this.products.splice(index, 1);
  }

  changeProductSlideToggle() {
    this.checkedAvailableAllProducts = !this.checkedAvailableAllProducts;
    if(this.checkedAvailableAllProducts) {
      this.products = this.products.map(item => {
        item.is_selected = true;
        return item;
      });
    }else{
      this.products = this.products.map(item => {
        item.is_selected = false;
        return item;
      });
    }
  }

  changeTransferableProductSlideToggle() {
    this.checkedTransferableAllProducts = !this.checkedTransferableAllProducts;
    if(this.checkedTransferableAllProducts) {
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
    const count = this.products.filter(obj => obj.is_selected).length
    return count > 0;
  }
}
