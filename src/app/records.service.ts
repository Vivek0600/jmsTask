import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor() {}
  lastOrderNumber : any;
  orderDetail : any= []
  orderCategory : any = [
    {id: 101, orderBy: "Party Self"},
    {id: 102, orderBy: "Sales Man"}
  ]
  cityList : any = [
    {id: 201, name: "ajmer"},
    {id: 202, name: "jaipur"},
    {id: 201, name: "jodhpur"},
    {id: 202, name: "udaipur"},
    {id: 201, name: "surat"},
    {id: 202, name: "ahmedabad"},
  ]
  priorityStatus : any = [
    {id: 301, status: "low"},
    {id: 302, status: "medium"},
    {id: 301, status: "high"}
  ]
  deliveryMode : any = [
    {id: 401, mode: "Deliver to store"},
    {id: 402, mode: "PickUp from counter"}
  ]
  status : any = [
    {id: 501, status: "In process"},
    {id: 502, status: "Deaft"},
    {id: 501, status: "inviced"}
  ]
}
