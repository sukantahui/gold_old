import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ManagerService} from '../../../../../services/manager.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-material-from-manager',
  templateUrl: './material-from-manager.component.html',
  styleUrls: ['./material-from-manager.component.scss']
})
export class MaterialFromManagerComponent implements OnInit {
  ownerFromMangerForm: FormGroup;
  materials: any;
  isProduction = environment.production;
  showDeveloperDiv = true;
  savedResponse: { status: any; data: any };
  materialBalance: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private managerService: ManagerService) {
    this.route.data.subscribe((response: any) => {
      this.materials = response.materialResolver.rawMaterials.data;
    });
    this.ownerFromMangerForm = new FormGroup({
      rm_id: new FormControl(36, [Validators.required]),
      value: new FormControl({value: 0, disabled: false}, [Validators.required, Validators.min(0.001)])
    });
  }

  ngOnInit(): void {
  }

  saveTransfer() {
    Swal.fire({
      title: 'Withdraw from Manager',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Withdraw',
      cancelButtonText: 'No!',
      background: 'rgba(38,39,47,0.95)'
    }).then((result) => {
      if (!result.value){return;}
      // here API call to save the data
      this.managerService.saveMaterialFromManagerToOwner(this.ownerFromMangerForm.value).subscribe((response: {status: any , data: any}) => {
        // when saved record successfully
        if (response.status === true) {
          Swal.fire({
            timer: 2000,
            title: 'Saved',
            text: 'Withdrawn successfully to Manager',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#1661a0',
            cancelButtonColor: '#d33',
            background: 'rgba(38,39,47,0.95)'
          });
          this.savedResponse = response;
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

  resetForm() {
    if (this.savedResponse){
      this.materialBalance = this.savedResponse.data.material_balance;
      this.savedResponse = null;
    }
    this.ownerFromMangerForm.reset();
  }
}
