import { Injectable } from '@angular/core';
import { FloodOptions } from './flood';
import { SolidBlock } from './solidBlock';

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
    this.floodOptions.speed = 300;
    this.floodOptions.area = this.initializeArea();
  }

  startFlood() {
    return new Promise(resolve => {
      this.loopRows(this.floodOptions.area).then(area => {
        resolve(area);
      });
    });
  }

  private initializeArea(): number[][] {
    let area = [];
    for (let row = 0; row < this.floodOptions.areaY; row++) {
      area[row] = this.initializeRow();
    }
    return area;
  }

  private initializeRow(): number[] {
    let row = [];
    for (let col = 0; col < this.floodOptions.areaX; col++) {
      row[col] = 1; 
    }
    return row;
  }


  private loopRows(area: number[][]) {
    return new Promise(resolve => {
      let loop = (area, row) => {
        setTimeout(() => {
          area = this.loopColsOnRow(area, row);

          row++;
          if(row == area.length || row > area.length) {
            resolve(area);
            return;
          }
          
          loop(area, row);

        }, this.floodOptions.speed);
      }

      loop(area, 0);
    });
  }

  private solidColumns = [];
  private adjacentSolidColumns = 0;
  private loopColsOnRow(area: number[][], row: number): number[][] {
    for (let col = 0; col < area[row].length; col++) {
      let currentColValue = area[row][col];

      if(this.validateColAbove(row, col, currentColValue)){
        this.solidColumns.push(new SolidBlock(row, col,area[row][col]));
        continue;
      } 

      if(currentColValue == 2 || this.existsSolidColumnAbove(row, col)) { 

        if(area[row][col+1] == 2 && this.solidColumns.find(sc => sc.row == row-1 && sc.col == col)) {

          this.calculateRightWaterSpread(area, row, col);
          this.calculateRightWaterForce(area, row, col);

          this.calculateLeftWaterSpread(area, row, col);
          this.calculateLeftWaterForce(area, row, col);

          this.solidColumns.push(new SolidBlock(row, col,area[row][col]));
          continue;
        }

        this.solidColumns.push(new SolidBlock(row, col,area[row][col]));
        continue;
      }

      area[row][col] = 3;
    }

    return area;
  }

  private calculateRightWaterSpread(area: number[][], row: number, col: number) {
    while(area[row][col+this.adjacentSolidColumns] == 2) {
      this.solidColumns.splice(this.solidColumns.findIndex(sc => sc.row == row-1 && sc.col == col+this.adjacentSolidColumns), 1);
      area[row-1][col+this.adjacentSolidColumns] = 3;
      this.adjacentSolidColumns++;
    }
    
  }

  private calculateLeftWaterSpread(area: number[][], row: number, col: number) {
    while(area[row][col-this.adjacentSolidColumns] == 2) {
      this.solidColumns.splice(this.solidColumns.findIndex(sc => sc.row == row-1 && sc.col == col-this.adjacentSolidColumns), 1);
      area[row-1][col-this.adjacentSolidColumns] = 3;
      this.adjacentSolidColumns++;
    }
  }

  private calculateRightWaterForce(area: number[][], row: number, col: number) {
    if(area[row][col+this.adjacentSolidColumns-1] == 2 && area[row-1][col+this.adjacentSolidColumns-1] == 3 && area[row][col+this.adjacentSolidColumns] != 2) {
      area[row][col+this.adjacentSolidColumns] = 3;
      area[row-1][col+this.adjacentSolidColumns] = 3;

      let force = Math.ceil(this.adjacentSolidColumns / 2);

      while(force != 0) {
        this.solidColumns.splice(this.solidColumns.findIndex(sc => sc.row == row-1 && sc.col == col+this.adjacentSolidColumns+force), 1);
        force--;
      }
    }
    this.adjacentSolidColumns = 0;
  }

  private calculateLeftWaterForce(area: number[][], row: number, col: number) {
    if(area[row][col-this.adjacentSolidColumns-1] == 2 && area[row-1][col-this.adjacentSolidColumns-1] == 3 && area[row][col-this.adjacentSolidColumns] != 2) {
      area[row][col-this.adjacentSolidColumns] = 3;
      area[row-1][col-this.adjacentSolidColumns] = 3;

      let force = Math.ceil(this.adjacentSolidColumns / 2);

      while(force != 0) {
        this.solidColumns.splice(this.solidColumns.findIndex(sc => sc.row == row-1 && sc.col == col-this.adjacentSolidColumns-force), 1);
        force--;
      }
    }
    this.adjacentSolidColumns = 0;
  }

  private existsSolidColumnAbove(row: number, col: number): boolean {
    return this.solidColumns.find(sc => sc.row == row-1 && sc.col == col);
  }
  private validateColAbove(row: number, col: number, currentCol: number): boolean {
    let colAbove = this.solidColumns.find(sc => sc.row == row-1 && sc.col == col);
    if(!colAbove) {
      return false;
    }

    if(colAbove.value == 2 && currentCol == 2) {
      return true;
    }
  }

}
