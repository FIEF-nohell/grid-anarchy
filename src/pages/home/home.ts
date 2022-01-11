import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  grid: Array<any> = [];

  constructor(public navCtrl: NavController) {

    this.reset()
    
  }

  reset(){
    for(let i = 0; i < 900; i++){
      this.grid.push(0);
    }
  }

  
  clicked(index: any, state: any){
    console.log(state)
    if(state == 0){
      this.grid[index] = 1;
    }
    else if(state == 1){
      this.grid[index] = 0;
    }
    console.log(this.grid)
  }

}
