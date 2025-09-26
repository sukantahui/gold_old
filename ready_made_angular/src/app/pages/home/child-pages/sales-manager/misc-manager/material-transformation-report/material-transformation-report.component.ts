import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ManagerService} from '../../../../../../services/manager.service';
import {ReportService} from '../../../../../../services/report.service';

interface MaterialTransformation {
  id: number;
  created_at: string;
  emp_name: string;
  material_transformation_type_name: string;
  materials_in_value: string | number;
  materials_out_value: string | number;
  materials_out_name: string;
}

@Component({
  selector: 'app-material-transformation-report',
  templateUrl: './material-transformation-report.component.html',
  styleUrls: ['./material-transformation-report.component.scss']
})
export class MaterialTransformationReportComponent implements OnInit {
  data: MaterialTransformation[];
  loading = false;
  constructor(private route: ActivatedRoute, private reportService: ReportService) { }

  ngOnInit(): void {
  }

    fetchData() {
      this.reportService.getMaterialTransformationReport().subscribe((response: {status: any , data: any}) => {
        console.log(response.data);
        this.data = response.data;
      }, error => {

      });

    }
}
