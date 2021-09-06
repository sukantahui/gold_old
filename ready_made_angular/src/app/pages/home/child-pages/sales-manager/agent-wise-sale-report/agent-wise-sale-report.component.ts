import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import {AgentWiseSalesReportService} from '../../../../../services/agent-wise-sales-report.service';
import {ReportService} from "../../../../../services/report.service";
import {CommonService} from "../../../../../services/common.service";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-agent-wise-sale-report',
  templateUrl: './agent-wise-sale-report.component.html',
  styleUrls: ['./agent-wise-sale-report.component.scss']
})
export class AgentWiseSaleReportComponent implements OnInit {
  agentWiseSaleReportForm: FormGroup;
  startDate: string;
  endDate: string;
  agentList: any[];
  sortedAgentList: any[];
  agentWiseSale: any[];
  qtyTotal: number;
  billedGoldTotal: number;
  billedLcTotal: number;
  goldReceivedTotal: number;
  lcReceivedTotal: number;
  isAllCustomers = false;
  color = 'accent';
  private agentWiseSalemaster: any[];
  constructor(private agentWiseSalesReportService: AgentWiseSalesReportService, private reportService: ReportService, private commonService: CommonService ) {
    const now = new Date();
    const currentSQLDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.startDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.endDate = formatDate(now, 'yyyy-MM-dd', 'en');

    this.agentWiseSaleReportForm = new FormGroup({
      start_date: new FormControl(currentSQLDate),
      end_date: new FormControl(currentSQLDate),
      agent_id: new FormControl(null)
    });
  }
  printDivStyle = {
    table: {'border-collapse': 'collapse', 'width' : '100%' },
    label:{'width': '100%'},
    th: {border: '1px  solid black' , 'fontSize' : 'small'},
    td: {border: '1px  solid black' , 'fontSize' : 'small'},

};


  ngOnInit(): void {
    this.agentWiseSalesReportService.getAgentsUpdateListener().subscribe((response)=>{
      this.agentList = response;
    });
  }
  startDateChangeEvent($event: any) {
    this.startDate = formatDate(new Date($event.value), 'yyyy-MM-dd', 'en');
  }

  endDateChangeEvent($event: any) {
    this.endDate = formatDate(new Date($event.value), 'yyyy-MM-dd', 'en');
  }
  dateInputEvent($event: any) {

  }

  getReport() {
    let agentId = '1';
    if (this.agentWiseSaleReportForm.get('agent_id').value != null){
      agentId = this.agentWiseSaleReportForm.get('agent_id').value;

    }
    this.reportService.getAgentWiseSaleReport( this.startDate, this.endDate, agentId).subscribe(response=>{

      this.agentWiseSalemaster = response.data;
      this.agentWiseSale = response.data;
      this.agentWiseSale =  this.agentWiseSale.filter(ag => ag.qty !== 0 || ag.gold_received !== 0  || ag.lc_received !== 0);
      this.qtyTotal = this.agentWiseSale.reduce((prev,next)=>prev+next.qty,0);
      this.billedGoldTotal = this.agentWiseSale.reduce((prev,next)=>prev+next.fine_gold,0);
      this.billedLcTotal = this.agentWiseSale.reduce((prev,next)=>prev+next.lc,0);
      this.goldReceivedTotal = this.agentWiseSale.reduce((prev,next)=>prev+next.gold_received,0);
      this.lcReceivedTotal = this.agentWiseSale.reduce((prev,next)=>prev+next.lc_received,0);

    }, (error) => {
      // when error occured
      console.log(error);
    });
  }

  sortData(sort: Sort){
    const data = this.agentWiseSale.slice();
    if (!sort.active || sort.direction === '') {
      this.agentWiseSale = data;
      return;
    }
    this.agentWiseSale = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const isDesc = sort.direction === 'desc';
      switch (sort.active) {
        case 'cust_name': return this.commonService.compare(a.cust_name, b.cust_name, isAsc);
          // case 'model_no': return compare(a.model_no, b.model_no, isAsc);
        case 'qty': return this.commonService.compare(a.qty, b.qty, isAsc);
        case 'fine_gold': return this.commonService.compare(a.fine_gold, b.fine_gold, isAsc);
        case 'lc': return this.commonService.compare(a.lc, b.lc, isAsc);
        case 'gold_received': return this.commonService.compare(a.gold_received, b.gold_received, isAsc);
        case 'lc_received': return this.commonService.compare(a.lc_received, b.lc_received, isAsc);
        default: return 0;
      }
    });
  }

  isAllCustomersChanged() {
    this.isAllCustomers=!this.isAllCustomers;
    if(this.isAllCustomers){
      this.agentWiseSale=this.agentWiseSalemaster;
    }else{
      this.agentWiseSale =  this.agentWiseSalemaster.filter(ag => ag.qty !== 0 || ag.gold_received !== 0  || ag.lc_received !== 0);
    }
  }
}
