import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ManagerService } from '../../../../../../services/manager.service';
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
  projectDetails: any;
  nitricToFineConversion: any;
  tonch: number;

  constructor(
      private route: ActivatedRoute,
      private http: HttpClient,
      private managerService: ManagerService
  ) {
    this.route.data.subscribe((response: any) => {
      this.managerMaterialBalance = response.materialResolver.managerMaterialBalance.data;
    });

    this.http.get('assets/projectDetails.json').subscribe((data: any) => {
      this.projectDetails = data;
      this.nitricToFineConversion = this.projectDetails.nitricToFineConversion;
      this.tonch = this.nitricToFineConversion.nitricToFineRatio;
    });

    this.nitricToFineForm = new FormGroup({
      nitric_value: new FormControl(0, [Validators.required]),
      fine_value: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  resetForm() {
    this.nitricToFineForm.reset({
      nitric_value: 0,
      fine_value: 0
    });
    this.nitricToFineForm.markAsPristine();
    this.savedResponse = null;
    this.materialBalanceUpdated = null;
  }

  onNitricChange(nitricValue: HTMLInputElement) {
    const nitric = +nitricValue.value || 0;
    const fine = nitric * this.nitricToFineConversion.nitricToFineRatio;
    this.nitricToFineForm.patchValue({ fine_value: fine.toFixed(3) });
    this.tonch = nitric ? fine / nitric : 0;
  }

  onFineChange(fineValue: HTMLInputElement) {
    const fine = +fineValue.value || 0;
    const nitric = Number(this.nitricToFineForm.get('nitric_value')?.value) || 0;
    this.tonch = nitric ? fine / nitric : 0;
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
      if (!result.value) { return; }

      this.managerService.saveNitricToFine(this.nitricToFineForm.value)
          .subscribe((response: { status: any, message: string, data: any }) => {
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
