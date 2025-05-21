import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Stock} from '../../../../../models/stock.model';
import {ManagerService} from '../../../../../services/manager.service';

@Component({
  selector: 'app-top-up-gold',
  templateUrl: './top-up-gold.component.html',
  styleUrls: ['./top-up-gold.component.scss']
})
export class TopUpGoldComponent implements OnInit {
  topUpGoldForm: FormGroup;
  responseMessage: any;

  constructor(private managerService: ManagerService) {
    this.topUpGoldForm = new FormGroup({
      job:  new FormControl(null, [Validators.required]),
      gold:  new FormControl(0, [Validators.required])}
    );
  }

  ngOnInit(): void {
  }

    onSubmit() {
      const job = this.topUpGoldForm.get('job')?.value;
      const gold = this.topUpGoldForm.get('gold')?.value;
      this.managerService.addTopUpGold(job, gold).subscribe((response: {status: any , data: Stock}) =>{
        this.responseMessage = response.data[0];
      });
    }

  onReset() {
    this.topUpGoldForm.reset({
      job: null,
      gold: 0
    });
    this.responseMessage = null;
  }
}
