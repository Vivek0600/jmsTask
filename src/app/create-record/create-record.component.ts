import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordsService } from '../records.service';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})
export class CreateRecordComponent implements OnInit {
  createFormGroup: any;
  showError = false;
  orderNumber: any;
  token: any;
  detailById: any;
  orderId: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public records: RecordsService) { }
  ngOnInit(): void {
    debugger
    this.createRecordForm();
    this.token = this.route.snapshot.params['token'];
    this.patchValue(this.token)
    if (this.token == 'new') {
      this.orderNumber = 1000;
    } else {
      this.orderNumber = this.records.lastOrderNumber
    }
  }
  createRecordForm(): void {
    this.createFormGroup = this.formBuilder.group({
      date: ["", [Validators.required]],
      pCode: [null, [Validators.required]],
      partyName: [null, [Validators.required]],
      city: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      orderBy: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      deliveryMode: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
  }
  get getForm() : any {
    return this.createFormGroup.controls;
  }
  onSubmit(): void {
    if (this.createFormGroup.invalid) {
      this.showError = true;
      return
    } else {
      this.orderNumber++
      this.records.lastOrderNumber = this.orderNumber
      this.showError = false;
      let payload = {
        orderNo: this.orderId ? this.orderId : "MRR" + this.orderNumber,
        date: this.createFormGroup.value.date,
        pCode: this.createFormGroup.value.pCode,
        partyName: this.createFormGroup.value.partyName,
        city: this.createFormGroup.value.city,
        amount: this.createFormGroup.value.amount,
        orderBy: this.createFormGroup.value.orderBy,
        priority: this.createFormGroup.value.priority,
        deliveryMode: this.createFormGroup.value.deliveryMode,
        status: this.createFormGroup.value.status
      }
      if (this.token != "new" && this.orderId) {
        this.records.orderDetail.splice(this.token, 1, payload)
      } else {
        this.records.orderDetail.push(payload);
      }
    }
  }
  viewRecords(): void {
    this.router.navigate(["display-record"]);
  }
  patchValue(i: number): void {
    this.detailById = this.records.orderDetail[i];
    this.orderId = this.detailById?.orderNo
    this.createFormGroup.patchValue({
      date: this.detailById?.date,
      pCode: this.detailById?.pCode,
      partyName: this.detailById?.partyName,
      city: this.detailById?.city,
      amount: this.detailById?.amount,
      orderBy: this.detailById?.orderBy,
      priority: this.detailById?.priority,
      deliveryMode: this.detailById?.deliveryMode,
      status: this.detailById?.status
    });
  }
}
