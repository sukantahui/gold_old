import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-labour-charge',
  templateUrl: './labour-charge.component.html',
  styleUrls: ['./labour-charge.component.scss']
})
export class LabourChargeComponent implements OnInit {
  agents: any[];
  isProduction = environment.production;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      console.log(response);
      this.agents = response.customerReceiptResolver.agents.data;
    });
  }

  ngOnInit(): void {
  }

}
