import { Component } from '@angular/core';

// document.fonts.check extension
import type {} from 'css-font-loading-module';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor() {}

  ngOnInit() {
    this.onFontLoad();
  }

  public hidden: boolean = false;

  // NEED TO APPEND GLOBAL STATE
  public onFontLoad() {
    let myTimer = setInterval(async () => {
      if (document.fonts.check('45px Pokemon')) {
        await this.sleep(1250);
        this.hidden = true;
        clearInterval(myTimer);
      } else {
        this.hidden = false;
      }
    }, 1);
  }

  public sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
