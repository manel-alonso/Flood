import { Injectable } from '@angular/core';
import { FloodOptions } from './flood';

@Injectable({
  providedIn: 'root'
})
export class FloodCoreService {

  floodOptions: FloodOptions = new FloodOptions();

  constructor() { }

  generateArea(x: number, y: number) {
    this.floodOptions.areaX = x;
    this.floodOptions.areaY = y;
    this.floodOptions.active = true;
    this.floodOptions.area = [];

    for (let row = 0; row < this.floodOptions.areaY; row++) {
      this.floodOptions.area[row] = [];
      for (let col = 0; col < this.floodOptions.areaX; col++) {
        this.floodOptions.area[row][col] = 1; 
      }
    }
  }

  startFlood() {
    let area = this.floodOptions.area;
    let row = 0;
    let solidColumns = [];

    let loop = () => {
      setTimeout(() => {
        for (let col = 0; col < area[row].length; col++) {
          let currentCol = area[row][col];
          let colAbove = solidColumns.find(sc => sc.row == row-1 && sc.col == col);
          let colBelow = area[row+1][col];

          if(colAbove) {
            if(colAbove.value == 2 && currentCol == 2) {
              solidColumns.push({"row":row,"col":col,"value":area[row][col]});
              continue;
            }
          }

          if(currentCol == 2 || colAbove) { 

            if(area[row][col+1] == 2 && solidColumns.find(sc => sc.row == row-1 && sc.col == col)) {
              
              let adjacents = 0;
              while(area[row][col+adjacents] == 2) {
                solidColumns.splice(solidColumns.findIndex(sc => sc.row == row-1 && sc.col == col+adjacents), 1);
                area[row-1][col+adjacents] = 3;
                adjacents++;
              }

              if(area[row][col+adjacents-1] == 2 && area[row-1][col+adjacents-1] == 3 && area[row][col+adjacents] != 2) {
                area[row][col+adjacents] = 3;
                area[row-1][col+adjacents] = 3;

                let force = Math.ceil(adjacents / 2);

                while(force != 0) {
                  solidColumns.splice(solidColumns.findIndex(sc => sc.row == row-1 && sc.col == col+adjacents+force), 1);
                  force--;
                }
              }

              solidColumns.push({"row":row,"col":col,"value":area[row][col]});
              continue;
            }

            solidColumns.push({"row":row,"col":col,"value":area[row][col]});
            continue;
          }

          area[row][col] = 3;
        }
        row++;
        loop();
      }, 300);
    };

    loop();
  }


}
