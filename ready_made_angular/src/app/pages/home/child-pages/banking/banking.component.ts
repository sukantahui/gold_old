import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ConfirmationService, MessageService, PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss'],
  providers: [MessageService , ConfirmationService]
})
export class BankingComponent implements OnInit {
  bankingForm: FormGroup;
  bankDetails: any;
  constructor(private http: HttpClient , private  messageService: MessageService , private  confirmationService: ConfirmationService) {
    this.bankingForm = new FormGroup({
      ifsc: new FormControl(null)
    });
  }
  ngOnInit(): void {
  }

  getBankDetails() {
    //using primeng confirmationService

    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // //using primeng messageService
        this.messageService.clear();
        this.messageService.add({
          severity: 'success',
          summary: '',
          life: 3000,
          detail: 'Stock transferred successfully'
        });
      },
      reject: () => {}
    });

    this.http.get<any>('https://ifsc.razorpay.com/' + this.bankingForm.get('ifsc').value).subscribe( response => {
      this.bankDetails = response;
    }, (error => {
      console.log('error getting record');
    }));
  }
}
