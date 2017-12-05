import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { CarouselComponent } from './../carousel/carousel.component';
import{HomePageService} from './homepage.service'
import { AppComponent } from '../app.component';
import { DomSanitizer } from '@angular/platform-browser';
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
  profileModal=false;
  userEmail:any;
  base64textString:any;
  userMobileNumber:any;
  emailPattern=/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
  checkLoginSession:any;

  constructor(public homePageService: HomePageService,public appComponent: AppComponent,private domSanitizer: DomSanitizer) {
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
  
  handleFileSelect(evt) {
  
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
   this.base64textString = btoa(binaryString);
    var image = 'data:image/png;base64,' + this.base64textString;
    this.userImg = this.domSanitizer.bypassSecurityTrustUrl(image);

  }
  ngOnInit() {
	  
  }
  
  userlogged(user){
	  console.log(user)
	  this.userName=user.name;
	  this.userImg=user.image;
	  this.userMobileNumber=user.mobile;
	  this.userEmail=user.personal_email;
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
    this.profileModal=false
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
            localStorage.setItem("userName", "test");
            localStorage.setItem("userEmail", "test@gmail.com");
            localStorage.setItem("userMobileNumber",this.mobileNumber);
			console.log(response.profile_status==1)
			if(response.profile_status==1){
				localStorage.setItem("profile_status","true");
			}
            
            this.otp = response.otp;
          } else if (response.code == 204) {
			  			console.log(response.profile_status==1)

            localStorage.setItem("userid", response.userid);
            localStorage.setItem("userName", "test");
            localStorage.setItem("userEmail", "test@gmail.com");
            localStorage.setItem("userMobileNumber",this.mobileNumber);
            if(response.profile_status==1){
				localStorage.setItem("profile_status","true");
			}
            this.otpModal = true;
            this.startTimer();
            this.displayTimer = true;
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

getProfile(){
    let json = {
      "request": {
        "type": "get_profile"
      },
      "requestinfo": {
        "name":  localStorage.getItem("userName"),
        "email_id":localStorage.getItem("userEmail"),
        "mobile": localStorage.getItem("userMobileNumber")
      }
    }
    console.log(localStorage.getItem("userid"))
    this.appComponent.updateshowLoader(true);
    this.homePageService.getProfile(json).subscribe(
      data => {
        this.appComponent.updateshowLoader(false);
        let response = data.response;
        if (response.code == 200) {
         this.userName=response.name;
         if(response.image!=""){
          this.userImg =response.image
         }
        
        } else {
          bootbox.alert(response.message);
        }
      },
      err => {}

    )
  }

  getMyProfile(){
    this.profileModal=true

  }

  upDateProfile(){
    if(!this.userEmail){
      bootbox.alert("Please enter email")
    }
    else if (!(this.userEmail.toLowerCase().match(this.emailPattern))) {
      bootbox.alert("Please enter valid email")
    }
    else  if (!this.userMobileNumber) {
      bootbox.alert("Please enter mobile number");
    } else if (this.userMobileNumber.toString().length != 10) {
      bootbox.alert("Please enter correct mobile number");
    } 
    else{
      let json={
        "request": {
          "type": "save_profile"
        },
        "requestinfo": {
          "devicetoken": "dxk1gs-EIe0:APA91bGPwGrfMSzx_HgImyio2V7pNPvYJhZqNNLQW9m1Op7DGHnxUpfJFWgYpbgbzf_vy75xBqJNLAReIpJvplAXvZMYPebhCB31FDq4caEQ6pbdoPBGFaoqYxkfPty7ROodaBiJ8AKR",
          "userid":localStorage.getItem("userid"),
          "name": this.userName,
          "image": this.base64textString,
          "comp_name": "",
          "address": "",
          "city": "",
          "state": "",
          "designation": "",
          "dob": "",
          "gender": "",
          "mobile":  localStorage.getItem("userMobileNumber"),
          "personal_email": this.userEmail,
          "official_email": "",
          "present_exp": "",
          "past_exp": "",
          "brief_past": "",
          "refer_by": "",
          "referer_mobile": "",
          "remark": "",
          "status": "",
          "emergency_name": "",
          "emergency_number": "",
          "is_update": "1",
          "country": "",
          "is_change": "0"
        }
      }
      this.homePageService.updateProfile(json).subscribe(
        data => {
          this.appComponent.updateshowLoader(false);
          let response = data.response;
          if (response.code == 200) {
            bootbox.alert(response.message);
          } else {
            bootbox.alert(response.message);
          }
        },
        err => {}
      )
      
    }
  }
  closeProfileModal(){
    this.profileModal=false;
    //this.userImg="";
    //this.userMobileNumber="";
    //this.userEmail="";
    //this.userImg="./../../assets/profile.png";
  }
}
