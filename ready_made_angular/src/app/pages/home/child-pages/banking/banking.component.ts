import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ConfirmationService, MessageService, PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss'],
  providers: [MessageService , ConfirmationService]
})
export class BankingComponent implements OnInit {
  bankingForm: UntypedFormGroup;
  bankDetails: any;
  uploadedFile: Array<any> = [];
  constructor(private http: HttpClient , private  messageService: MessageService , private  confirmationService: ConfirmationService) {
    this.bankingForm = new UntypedFormGroup({
      ifsc: new UntypedFormControl(null),
      // testing
      image: new UntypedFormControl(null, [Validators.required])
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
        if(this.uploadedFile.length === 0){
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: '',
            life: 3000,
            detail: 'Please upload a pic !'
          });
        }
        else {
          this.http.get<any>('https://ifsc.razorpay.com/' + this.bankingForm.get('ifsc').value).subscribe( response => {
            this.bankDetails = response;
            this.messageService.clear();
            this.messageService.add({
              severity: 'success',
              summary: '',
              life: 3000,
              detail: 'Done!'
            });
          }, (error => {
            console.log('error getting record');
            // console.log(error);
            this.messageService.clear();
            this.messageService.add({
              severity: 'error',
              summary: '',
              life: 3000,
              detail: error.statusText
            });
          }));
        }
        },
      reject: () => {}
    });


  }
  onImageUpload(event: any){
    console.log("invoke");
    // const files = event.target.files;
    //
    const files = event.target.files;
    this.bankingForm.value.image = files;
    this.uploadedFile.push(...event.target.files);
    // console.log(files);
  }
}
