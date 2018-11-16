import { Component, OnInit } from '@angular/core';
import {Http}   from '@angular/http';
//import { CategoryPipe } from '../services/category.pipe';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  //styleUrls: ['./employee.component.css'],
  

})

export class EmployeeComponent implements OnInit {
private emps : any[] =[];
private btn_stt : boolean =true;
private edit_id: any[];
private city : any[];

//pipes: [CategoryPipe] 
  constructor(private http :Http,private x:Http) { }

  editCity(ct){
    this.btn_stt = false;
    this.edit_id = ct.key;
    this.city = ct.data;
    console.log(ct.key)
  }
  delCity(key){
    console.log("key is ",key)
    this.x.delete("https://employee-7744d.firebaseio.com/employee.json"+key+".json").subscribe(

      (res)=>{
       console.log('Record deleted ',res)
       this.getCities();
      },
      (error)=>{
      console.log('The error is ',error)
      }
    )}
  ngOnInit() {
    this.getCities();
  }
  getCities(){
    this.http.get("https://employee-7744d.firebaseio.com/employee.json").subscribe(
      (res)=>{
        console.log('Response is ',res.json())
        let resJson = res.json();
        let keys = Object.keys(resJson);
        console.log('keys is ',keys)
        this.emps = keys.map(function(key){
          console.log('Response are ',resJson[key]);
          return {key : key,value : resJson[key]};
          
        })
      },
      (err)=>{
        console.log('The error s ',err)
      }
    )
  }

}
