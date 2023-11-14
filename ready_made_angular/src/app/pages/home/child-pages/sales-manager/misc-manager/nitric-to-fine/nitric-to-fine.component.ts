import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ManagerService} from '../../../../../../services/manager.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nitric-to-fine',
  templateUrl: './nitric-to-fine.component.html',
  styleUrls: ['./nitric-to-fine.component.scss']
})
export class NitricToFineComponent implements OnInit {
  isProduction = environment.production;
  showDeveloperDiv = false;
  nitricToFineForm: FormGroup;
  managerMaterialBalance: any;
  savedResponse: any;
  materialBalanceUpdated: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private managerService: ManagerService) {
    this.route.data.subscribe((response: any) => {
      this.managerMaterialBalance = response.materialResolver.managerMaterialBalance.data;
    });
    this.nitricToFineForm = new FormGroup({
      nitric_value: new FormControl(0, [Validators.required]),
      fine_value: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  resetForm() {

  }

  saveConversion() {
    Swal.fire({
      title: 'Nitric to Fine',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Convert',
      cancelButtonText: 'No!',
      background: 'rgba(38,39,47,0.95)'
    }).then((result) => {
      if (!result.value){return; }
      // here API call to save the data
      // tslint:disable-next-line:max-line-length
      this.managerService.saveNitricToFine(this.nitricToFineForm.value).subscribe((response: {status: any, message: string , data: any}) => {
        // when saved record successfully
        if (response.status === true) {
          Swal.fire({
            timer: 2000,
            title: 'Saved',
            text: 'Nitric Successfully Converted to Fine',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#1661a0',
            cancelButtonColor: '#d33',
            background: 'rgba(38,39,47,0.95)'
          });
          this.savedResponse = response;
          this.materialBalanceUpdated = response.data.material_balance;
          this.nitricToFineForm.markAsPristine();
        }
      }, error => {
        // error saving record
        Swal.fire({
          title: error.message,
          text: 'Transfer unsuccessful',
          icon: 'error',
          showConfirmButton: false,
          background: 'rgba(38,39,47,0.95)',
          timer: 3000
        });
      });
    });
  }
}
