import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { CarouselComponent } from './../carousel/carousel.component';
import{HomePageService} from './homepage.service'
import { AppComponent } from '../app.component';
declare var bootbox: any;
@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
  providers: [HomePageService]
})
export class HomepageComponent implements OnInit {
  signupModal: boolean;
  displayTimer: boolean;
  ticks = 0;
  secondsDisplay = 0;
  sub: Subscription;
  userName:any;
  userImg:any;
  email:any;
  mobileNumber:any
  otp:any;
  inputOtp:any
  otpModal=false
  isLogin=false
  disableResend=true;
  emailPattern=/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
  checkLoginSession:any;
  constructor(public homePageService: HomePageService,public appComponent: AppComponent) {
    this.signupModal = false;
    this.displayTimer = false;
    this.isLogin = false;
    if(localStorage.getItem("is_login")=="true"){
      this.isLogin=true
    }
    else{
      this.isLogin=false
    }
  }
  
  ngOnInit() {
	  
  }
  
  userlogged(user){
	  console.log(user)
	  this.userName=user.name;
	  this.userImg=user.image;
  }
  public openSignupModal() {
    this.signupModal = true;
  }

  public closeModal() {
    this.signupModal = false;
    this.otpModal=false
    this.sub.unsubscribe();
    this.disableResend=false;
    this.otpModal=false
    this.displayTimer=false
    this.disableResend=true;
    this.otpModal = false;
    this.inputOtp=""
  }

  public onLogin() {
    if (!this.mobileNumber) {
      bootbox.alert("Please enter mobile number");
    } else if (this.mobileNumber.toString().length != 10) {
      bootbox.alert("Please enter correct mobile number");
    } else {
      let json = {
        request: {
          type: "login"
        },
        requestinfo: {
          userid: "",
          name: "test",
          email_id: "test@gmail.com",
          mobile: this.mobileNumber,
          type: "manual"
        }
      };
      this.appComponent.updateshowLoader(true);
      this.homePageService.login(json).subscribe(
        data => {
          this.appComponent.updateshowLoader(false);
          let response = data.response;
          if (response.code == 200) {
            this.otpModal = true;
            this.startTimer();
            this.displayTimer = true;
            localStorage.setItem("userid", response.userid);
            this.otp = response.otp;
          } else if (response.code == 204) {
            this.otpModal = true;
            this.startTimer();
            this.displayTimer = true;
            localStorage.setItem("userid", response.userid);
            this.otp = response.otp;
          } else {
            bootbox.alert(response.message);
          }
        },
        err => {}
      );
    }
  }

  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private pad(digit: any) {
    return digit <= 9 ? "0" + digit : digit;
  }

  startTimer(){
    this.secondsDisplay=60;
    this.disableResend=true;
    this.displayTimer = true;
    const timer = Observable.timer(1, 1000);
    this.sub = timer.subscribe(t => {
      this.ticks = t;

      let second = this.getSeconds(this.ticks);
      this.secondsDisplay--;
      if (this.secondsDisplay ==0) {
        this.sub.unsubscribe();
        this.disableResend=false;
        this.inputOtp=""
        this.otpModal=false
        this.displayTimer=false
      }
      else{

      }
    });
  }

  onOtp() {
    if (!this.inputOtp) {
      bootbox.alert("Your enter OTP .");
    } else if (this.otp == this.inputOtp) {
      localStorage.setItem("is_login", "true");
      this.checkLoginSession=true
      this.isLogin = true;
      this.closeModal();
    } else {
      bootbox.alert("Your enter OTP is wrong please try again later.");
      this.isLogin=false
      localStorage.setItem("is_login", "false");
    }
  }
}
