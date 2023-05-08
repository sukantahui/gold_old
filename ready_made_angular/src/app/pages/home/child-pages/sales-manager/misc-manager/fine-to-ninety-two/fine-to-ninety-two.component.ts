import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-fine-to-ninety-two',
  templateUrl: './fine-to-ninety-two.component.html',
  styleUrls: ['./fine-to-ninety-two.component.scss']
})
export class FineToNinetyTwoComponent implements OnInit {
  materialBalance: any[];
  isProduction = environment.production;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.materialBalance = response.fineToNinetyTwoResolver.materialBalance.data;
      console.log('Response ', response);
    });
  }

  ngOnInit(): void {

  }


}
