import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {TransferAgentService} from '../../../../../services/transfer-agent.service';

@Component({
  selector: 'app-transfer-to-agent',
  templateUrl: './transfer-to-agent.component.html',
  styleUrls: ['./transfer-to-agent.component.scss']
})
export class TransferToAgentComponent implements OnInit {
  agents: any[];
  products: any[];
  selectedProducts: any[] = [];
  transferForm: FormGroup;
  disabled: any;
  searchTerm: any;
  pageSize = 50;
  currentPage = 1;
  searchTermSelectedProducts: any;
  pageSizeSelectedProducts = 50;
  currentPageSelectedProducts = 1;
  color = 'accent';
  checked = false;
  checkedSelectAllProducts = false;
  constructor(public transferAgentService: TransferAgentService) {
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

  changedProductSlideToggle() {
    this.checkedSelectAllProducts = !this.checkedSelectAllProducts;
  }
}
