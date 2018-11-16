import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  private btn_stt : boolean = true;
  private cities : any[];
  private city : any = {};
private edit_id : string;
  constructor(private x : Http) { }

  ngOnInit() {
    this.getCities();
  }

  editCity(ct){
    this.btn_stt = false;
    this.edit_id = ct.key;
    this.city = ct.data;
    console.log("hi")
  }

  updateCity(){
    this.x.put("https://myway-92be6.firebaseio.com/cities/"+this.edit_id+".json",this.city).subscribe(

      (res)=>{
       console.log('Record updated ',res)
       this.getCities();
      },
      (error)=>{
      console.log('The error is ',error)
      }
    )
  }

  delCity(key){
    console.log("key is ",key)
    this.x.delete("https://myway-92be6.firebaseio.com/cities/"+key+".json").subscribe(

      (res)=>{
       console.log('Record deleted ',res)
       this.getCities();
      },
      (error)=>{
      console.log('The error is ',error)
      }
    )}
    
  
getCities(){
this.x.get("https://myway-92be6.firebaseio.com/cities.json").subscribe(

  (res)=>{
    var record = res.json();
    var keys = Object.keys(record);
    this.cities = keys.map(function(key){
return {key : key,data : record[key]};
    })
  },
  (error)=>{
  console.log('The error is ',error)
  },
  ()=>{
  
  })
}


  saveCity(){
    this.x.post('https://myway-92be6.firebaseio.com/cities.json',this.city).subscribe(

(res)=>{
console.log('Recedord insert')
this.city = {};
this.getCities();
},
(error)=>{
console.log('The error is ',error)
},
()=>{

})
  }

}
