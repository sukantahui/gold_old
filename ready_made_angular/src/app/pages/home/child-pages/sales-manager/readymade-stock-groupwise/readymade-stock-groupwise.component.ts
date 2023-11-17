import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ReportService} from '../../../../../services/report.service';

@Component({
  selector: 'app-readymade-stock-groupwise',
  templateUrl: './readymade-stock-groupwise.component.html',
  styleUrls: ['./readymade-stock-groupwise.component.scss']
})
export class ReadymadeStockGroupwiseComponent implements OnInit {
  isProduction: boolean = environment.production;
  stockByGroup: any;
  selectedCategoryIndex = -1;
  stockListBySelectedCategory: any;
  selectedCategory: any;
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  showRecord() {
    console.log('testing');
    this.reportService.getStockInHandGroupwise().subscribe(response =>{
        this.stockByGroup = response.data;
      });
  }

  categorySelected(groupItem, i) {
    this.selectedCategoryIndex = i;
    this.selectedCategory = this.stockByGroup[i];
    this.reportService.getStockInHandByCategory(groupItem.product_category_id).subscribe((response: any) => {
      this.stockListBySelectedCategory = response.data;
    });
  }

  modelSelected(stockItem, i) {
    
  }
}
