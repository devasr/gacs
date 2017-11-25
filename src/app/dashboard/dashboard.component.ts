import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  signupModal:boolean;
  displayTimer:boolean;
  ticks = 0;
  secondsDisplay: number = 0;
  sub: Subscription;
  constructor() {
    this.signupModal=false;
    this.displayTimer=false;
   }

  ngOnInit() {
  }

  public openSignupModal(){
    this.signupModal=true;
  }

  public closeModal(){
    console.log("closeModal");
    this.signupModal=false;
    console.log(this.signupModal)
  }

  public onLogin(){
    this.displayTimer=true;
        let timer = Observable.timer(1, 1000);
        this.sub = timer.subscribe(
            t => {
                this.ticks = t;
                
                this.secondsDisplay = this.getSeconds(this.ticks);
                if(this.secondsDisplay==60){
                  this.sub.unsubscribe();
                }
            }
        );
  }
  
  private getSeconds(ticks: number) {
          return this.pad(ticks % 60);
  }
      
  private pad(digit: any) { 
        return digit <= 9 ? '0' + digit : digit;
  }
}
