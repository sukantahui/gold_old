import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-fine-to-ninety-two',
  templateUrl: './fine-to-ninety-two.component.html',
  styleUrls: ['./fine-to-ninety-two.component.scss']
})
export class FineToNinetyTwoComponent implements OnInit {
  materials_balance: any[];

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.materials_balance = response.fineToNinetyTwoResolver.agents.data;
      console.log('Response ', response);
    });
  }

  ngOnInit(): void {
  }

}
