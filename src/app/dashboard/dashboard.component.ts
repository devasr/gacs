import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { CarouselComponent } from './../carousel/carousel.component';
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  // directives: [CarouselComponent]
})
export class DashboardComponent implements OnInit {
  signupModal: boolean;
  displayTimer: boolean;
  ticks = 0;
  secondsDisplay = 0;
  sub: Subscription;
  constructor() {
    this.signupModal = false;
    this.displayTimer = false;
  }

  ngOnInit() {}

  public openSignupModal() {
    this.signupModal = true;
  }

  public closeModal() {
    this.signupModal = false;
    console.log(this.signupModal);
  }

  public onLogin() {
    this.displayTimer = true;
    const timer = Observable.timer(1, 1000);
    this.sub = timer.subscribe(t => {
      this.ticks = t;

      this.secondsDisplay = this.getSeconds(this.ticks);
      if (this.secondsDisplay === 60) {
        this.sub.unsubscribe();
      }
    });
  }

  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private pad(digit: any) {
    return digit <= 9 ? "0" + digit : digit;
  }
}
