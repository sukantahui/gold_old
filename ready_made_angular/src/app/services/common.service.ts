import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject, timer} from 'rxjs';
import {ProjectData} from '../models/project-data.model';
import {HttpClient} from '@angular/common/http';
import {formatDate} from '@angular/common';
import {ServerResponse} from '../models/ServerResponse.model';
import {environment} from '../../environments/environment';
import {concatMap, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import * as XLSX from "xlsx";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class CommonService {

  value$ = new BehaviorSubject(20);
  currentValue = 0;

  deviceXs = false;
  projectData: ProjectData;
  public currentTime: object;
  projectDataSubject = new Subject<ProjectData>();
  private pictures: any;
  private BASE_API_URL = environment.BASE_API_URL;
  route: string;
  actual_base_api_url="";
  constructor() {

    setInterval(() => {
      this.currentValue += 10;
      this.value$.next(this.currentValue);
      // just testing if it is working
    }, 1000);
    let project_url =window.location.origin;
    let firstArray =  project_url.split("/");
    let secondArray =  firstArray[2].split(":");
    this.actual_base_api_url = (firstArray[0]+"//"+secondArray[0]+this.BASE_API_URL);
  }
  getAPI(){
    return this.actual_base_api_url;
  }
  getProjectData(){
    return {...this.projectData};
  }
  getVariableSettingsListener(){
    return this.projectDataSubject.asObservable();
  }
  updateVariableSettings(projectData: ProjectData){
    this.projectData = projectData;
    this.projectDataSubject.next({...this.projectData});
  }
  setDeviceXs(dx: boolean){
    this.deviceXs = dx;
  }
  getDeviceXs(): boolean{
    return this.deviceXs;
  }
  getCurrentDate(){
    const now = new Date();
    const currentDate = formatDate(now, 'dd-MM-yyyy', 'en');
    return currentDate;
  }

  getCurrentTime(){
    console.log('time in func', this.currentTime);
    const now = new Date();
    const hour = now.getHours();
    let meridiem = '';
    if (hour >= 12){
      meridiem = 'PM';
    }else{
      meridiem = 'AM';
    }
    const currentTime = formatDate(now, 'hh:mm:ss', 'en') + ' ' + meridiem;
    return currentTime;
  }

  loadValue(i) {
    this.currentValue += i;
    this.value$.next(this.currentValue);
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  exportToExcel(tableId: string, fileName: string, sheetName = 'Sheet1'): void
  {
    /* table id is passed over here */
    let element = document.getElementById(tableId);
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    /* save to file */
    XLSX.writeFile(wb, fileName);

  }
}
