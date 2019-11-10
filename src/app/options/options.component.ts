import { Component, OnInit, Input } from '@angular/core';
import { FloodCoreService } from '../services/flood-core.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  width: number = 0;
  maxWidth: number = 0;
  height: number = 0;
  maxHeight: number = 0;

  @Input() cwidth: number;
  @Input() cheight: number;

  constructor(public flood: FloodCoreService) {
    
  }

  ngOnInit() {
    this.maxWidth = (this.cwidth / 20);
    this.width = this.maxWidth;
    
    this.maxHeight = (this.cheight / 20);
    this.height = this.maxHeight;
  }

  generateArea() {
    this.flood.generateArea(this.width, this.height);
  }

}
