import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  grid: Array<any> = [];

  constructor(public navCtrl: NavController) {

    for(let i = 0; i < 1152; i++){
      this.grid.push(0);
    }



  }
  
}
