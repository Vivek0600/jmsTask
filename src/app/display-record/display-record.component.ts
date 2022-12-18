import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsService } from '../records.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-display-record',
  templateUrl: './display-record.component.html',
  styleUrls: ['./display-record.component.css']
})
export class DisplayRecordComponent implements OnInit {
  detail:any = [];
  pageSize:number = 0;
  date= new Date()
  constructor(public records: RecordsService, private router: Router) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }
  getOrderDetails(){
    debugger
    if(this.records.orderDetail.length > 0){
      for(let i=this.pageSize; i< this.pageSize + 10; i++){
        this.detail.push(this.records.orderDetail[i]);
      }
    }
  }
  onLoadMore(){
    this.pageSize += 10;
    this.getOrderDetails();
  }
  createOrder(){
    if(this.records.orderDetail.length > 0){
      this.router.navigate(['create-record/add']);
    } else {
      this.router.navigate(['create-record/new']);
    }
  }
  onEdit(i:number){
    this.router.navigate(['create-record/' + i])
  }
  onSearch(val:any){
    let nameKey = val.target.value
    this.detail = []
    if(nameKey != ''){
      for (let i=0; i < this.records.orderDetail.length; i++) {
        if (this.records.orderDetail[i].partyName === nameKey) {
          this.detail.push(this.records.orderDetail[i]);
        }
    }
  }else {
    this.getOrderDetails();
  }
  }
  onView(data:any):void{
    console.log(data)
    let element = document.getElementById('exclData');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)
    const wb:XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb,ws,"sheet1")
    XLSX.writeFile(wb,"my_order_records.xlsx")
  }
}
