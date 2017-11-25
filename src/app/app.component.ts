import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showLoader=false;

  updateshowLoader(showLoader){
    console.log(this.showLoader);
  this.showLoader=showLoader;
 
}
}
