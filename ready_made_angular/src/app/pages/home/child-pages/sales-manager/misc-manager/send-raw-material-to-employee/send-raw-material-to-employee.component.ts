import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-send-raw-material-to-employee',
  templateUrl: './send-raw-material-to-employee.component.html',
  styleUrls: ['./send-raw-material-to-employee.component.scss']
})
export class SendRawMaterialToEmployeeComponent implements OnInit {
  resolverValues: any;
  isProduction = environment.production;
  showDeveloperDiv: boolean;
  employees: any;
  selectableEmployees: null;
  projectDetails: any;
  materialSendingForm: FormGroup;
  user: any;
  rawMaterials: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.data.subscribe((response: any) => {
      this.user = response.materialResolver.user;
      this.resolverValues = response.materialResolver;
      this.employees = response.materialResolver.employees.data;
      this.projectDetails = response.materialResolver.projectDetails;
      this.rawMaterials = response.materialResolver.rawMaterials.data;
      // tslint:disable-next-line:max-line-length
      this.selectableEmployees = this.employees.filter(emp => this.projectDetails.managerToEmployeeMaterial.employees.find(rm => (rm === emp.employeeId )));
      // this.selectableEmployees = null;
    });
    this.materialSendingForm = new FormGroup({
      employee_id: new FormControl(this.user.emp_id, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

}
