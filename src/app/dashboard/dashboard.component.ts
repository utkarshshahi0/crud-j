import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { AuthService } from '../auth.service';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  applicationForm: FormGroup;
  applications: any[] = [];

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      applicationAmount: ['', Validators.required],
      profilePicture: ['', Validators.required],
      markSheet: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.applicationService.getApplications().subscribe(data => {
      this.applications = data;
    });
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      this.applicationService.addApplication(this.applicationForm.value).subscribe(response => {
        this.toastr.success('Application added successfully!', 'Success');
        this.loadApplications();
      }, error => {
        this.toastr.error('Failed to add application!', 'Error');
      });
    }
  }

  editApplication(app: any) {
    // Logic to edit application
  }

  deleteApplication(id: number) {
    this.applicationService.deleteApplication(id).subscribe(response => {
      this.toastr.success('Application deleted successfully!', 'Success');
      this.loadApplications();
    }, error => {
      this.toastr.error('Failed to delete application!', 'Error');
    });
  }

  downloadApplication(id: number) {
    // Logic to download individual application as PDF
    const doc = new jsPDF();
    doc.text('Application Data', 10, 10);
    // Add more data to PDF
    doc.save('application.pdf');
  }

  downloadAllApplications() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.applications);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // this.saveAsExcelFile(excelBuffer, 'applications');
  }

  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  //   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }

  logout() {
    // this.authService.logout();
  }
}
