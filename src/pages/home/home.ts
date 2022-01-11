import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  grid: Array<any> = [];
  online_toggle: any;
  json_string: any;
  json_array: any;
  cronjob: any;
  part1: any;
  part2: any;
  part3: any;
  part4: any;
  part5: any;
  part6: any;
  part7: any;
  part8: any;

  async ngOnInit() {

  }

  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.reset()
  }

  getData(){
    return this.http.get("http://localhost:6969/get_data", {responseType: "json"});
  }

  async pushData(body){
    console.log("push")
    this.http.post("http://localhost:6969/push_data", body).subscribe(data => {}, error => {});
  }

  getDataSub(){
    this.getData().subscribe(async (sub: any) =>{
      this.json_string = sub[0].grid_1 + sub[0].grid_2 + sub[0].grid_3 + sub[0].grid_4 + sub[0].grid_5 + sub[0].grid_6 + sub[0].grid_7 + sub[0].grid_8;      
      this.grid = JSON.parse(this.json_string);
    });
  }

  async sendToDB(){
    var obj = {"val1": this.part1, "val2": this.part2, "val3": this.part3, "val4": this.part4, "val5": this.part5, "val6": this.part6, "val7": this.part7, "val8": this.part8}
    await this.pushData(obj);
  }

  reset(){
    this.grid = [];
    for(let i = 0; i < 900; i++){
      this.grid.push(0);
    }
  }

  convert_to_json(){
    this.json_array = JSON.stringify(this.grid);

    this.part1 = this.json_array.slice(0,255);
    this.part2 = this.json_array.slice(255,510);
    this.part3 = this.json_array.slice(510,765);
    this.part4 = this.json_array.slice(765,1020);
    this.part5 = this.json_array.slice(1020,1275);
    this.part6 = this.json_array.slice(1275,1530);
    this.part7 = this.json_array.slice(1530,1785);
    this.part8 = this.json_array.slice(1785,);

  }

  toggled(){
    if(this.online_toggle == true){
      this.reset();
      this.cronjob = setInterval(() => {
        this.getDataSub();
     }, 500);
    }
    else{
      clearInterval(this.cronjob);
      this.reset();
    }
  }

  clear(){
    clearInterval(this.cronjob);
    this.reset();
    this.convert_to_json();
    this.sendToDB();
    this.cronjob = setInterval(() => {
      this.getDataSub();
    }, 500);
  }
  
  async clicked(index: any, state: any){
    clearInterval(this.cronjob);
    if(state == 0){
      this.grid[index] = 1;
    }
    else if(state == 1){
      this.grid[index] = 0;
    }
    if(this.online_toggle == true)
    {
      this.convert_to_json();
      this.sendToDB();
      this.cronjob = setInterval(() => {
        this.getDataSub();
      }, 500);
    }
  }

}
