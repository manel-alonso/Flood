import { Component, OnInit, HostListener } from '@angular/core';
import { FloodCoreService } from '../services/flood-core.service';

@Component({
  selector: 'app-flood',
  templateUrl: './flood.component.html',
  styleUrls: ['./flood.component.css']
})
export class FloodComponent implements OnInit {

  paintActive: boolean;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key == " " && this.paintActive) {
      this.paintActive = false;
      return;
    }

    if(event.key == " ") {
      this.paintActive = true;
    }

    if(event.key == "x") {
      this.flood.startFlood().then(area => {
        console.log("Finished with area:", area);
      });
    }
  }

  constructor(public flood: FloodCoreService) { }

  ngOnInit() {
  }

  changeColor(rowIndex, colIndex) {
    if(!this.paintActive) return;

    this.flood.floodOptions.area[rowIndex][colIndex] = 2;
  }

}
