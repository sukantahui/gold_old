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

  test() {
    var newArray = this.products.filter(function (el)
    {
      return el.is_selected;
    });
    console.log(newArray);
    this.products = this.products.filter(ar => !newArray.find(rm => (rm.tag === ar.tag )));
    this.selectedProducts.push(...newArray);
    console.log(this.selectedProducts);
  }

  sendProduct(product: any) {
    const index = this.products.findIndex(x => x.tag === product.tag);
    this.products.splice(index,1);
  }
}
