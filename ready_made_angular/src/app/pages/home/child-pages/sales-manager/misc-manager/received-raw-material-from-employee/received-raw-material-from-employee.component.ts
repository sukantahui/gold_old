import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ManagerService} from '../../../../../../services/manager.service';
import {CommonService} from '../../../../../../services/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-received-raw-material-from-employee',
  templateUrl: './received-raw-material-from-employee.component.html',
  styleUrls: ['./received-raw-material-from-employee.component.scss']
})
export class ReceivedRawMaterialFromEmployeeComponent implements OnInit {
  resolverValues: any;
  showDeveloperDiv: boolean;
  isProduction = environment.production;
  employees: any;
  selectableEmployees: null;
  projectDetails: any;
  user: any;
  rawMaterials: any;
  selectableMaterials: any[];
  savedResponse: any;
  materialBalances: any[] = [];
  materialRecivingForm: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private managerService: ManagerService, private commonservice: CommonService) {
    this.route.data.subscribe((response: any) => {
      this.user = response.materialResolver.user;
      this.resolverValues = response.materialResolver;
      this.employees = response.materialResolver.employees.data;
      this.projectDetails = response.materialResolver.projectDetails;
      this.rawMaterials = response.materialResolver.rawMaterials.data;
      this.materialBalances = response.materialResolver.materialBalances.data;
      // tslint:disable-next-line:max-line-length
      this.selectableEmployees = this.employees.filter(emp => this.projectDetails.employeeToManagerMaterial.employees.find(rm => (rm === emp.employeeId )));
      // tslint:disable-next-line:max-line-length
      this.selectableMaterials = this.rawMaterials.filter(rm => this.projectDetails.employeeToManagerMaterial.materialsToSend.find(selectableRm => (selectableRm === rm.rmID )));
      // this.selectableEmployees = null;
    });

    this.materialRecivingForm = new FormGroup({
      outward_employee_id: new FormControl(null, [Validators.required]),
      inward_employee_id: new FormControl(this.user.emp_id, [Validators.required]),
      rm_id: new FormControl(null, [Validators.required]),
      value: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  saveMaterialTransfer() {
    Swal.fire({
      title: 'Dal Creation',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Convert',
      cancelButtonText: 'No!',
      background: 'rgba(38,39,47,0.95)'
    }).then((result) => {
      if (!result.value){return; }
      // here API call to save the data
      this.managerService.saveMaterialTransfer(this.materialRecivingForm.value).subscribe((response: {status: any , data: any}) => {
        // when saved record successfully
        if (response.status === true) {
          Swal.fire({
            timer: 2000,
            title: 'Saved',
            text: 'Transferred successfully',
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

  onEmployeeChange() {
    const selectedEmployeeId = this.materialRecivingForm.get('outward_employee_id').value;
    // tslint:disable-next-line:max-line-length
    this.http.get(this.commonservice.getAPI() + '/materialBalance/' + selectedEmployeeId).subscribe((response: {success: number , data: any[]}) => {
      console.log(response.data);
    });
  }
}
