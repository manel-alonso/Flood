import { Component, ViewChild, ElementRef } from '@angular/core';
import { FloodCoreService } from './services/flood-core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild("maincontainer", {read: "", static: true}) container: ElementRef;

  cWidth: 0;
  cHeight: 0;
  containerActive: boolean = false;

  constructor(public flood: FloodCoreService) {

  }

  ngOnInit() {
    this.cWidth = this.container.nativeElement.clientWidth;
    this.cHeight = this.container.nativeElement.clientHeight;
    this.containerActive = true;

  }

  title = 'flood';
}
