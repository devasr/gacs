import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { CarouselComponent } from './../carousel/carousel.component';
import { HomePageService } from './homepage.service';
import { AppComponent } from '../app.component';
import { DomSanitizer } from '@angular/platform-browser';
declare var bootbox: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [HomePageService]
})
export class HomepageComponent implements OnInit, OnDestroy {
  signupModal: boolean;
  displayTimer: boolean;
  ticks = 0;
  secondsDisplay = 0;
  sub: Subscription;
  mobileNumber: any;
  user:any;
  email:any;
  otp:any;
  inputOtp:any;
  name: any;
  image: any;
  comp_name: any;
  address:any;
  city: any;
  state: any;
  designation: any;
  dob: any;
  gender: any;
  mobile: any;
  personal_email: any;
  official_email: any;
  present_exp: any;
  past_exp: any;
  brief_past: any;
  refer_by: any;
  referer_mobile: any;
  remark: any;
  status: any;
  emergency_name: any;
  emergency_number: any;
  is_update: any;
  visiting_image: any;
  country: any;
  otpModal=false;
  isLogin=false;
  disableResend=true;
  profiledata=false;
  profileModal=false;
  base64textString:any;
  base64textStringVisit:any;
  emailPattern=/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
  checkLoginSession:any;

  constructor(public homePageService: HomePageService,public appComponent: AppComponent,private domSanitizer: DomSanitizer) {
    this.signupModal = false;
    this.displayTimer = false;
    this.isLogin = false;
    if(localStorage.getItem('is_login')=='true'){
      this.isLogin=true
    }
    else{
      this.isLogin= false;
    }
  }

  handleFileSelectVisit(evt) {

    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoadedVisit.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  _handleReaderLoadedVisit(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textStringVisit = btoa(binaryString);
    var image = 'data:image/png;base64,' + this.base64textStringVisit;
    this.visiting_image = this.domSanitizer.bypassSecurityTrustUrl(image);

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
    var img = 'data:image/png;base64,' + this.base64textString;
    this.image = this.domSanitizer.bypassSecurityTrustUrl(img);

  }
  ngOnInit() {

  }
  ngOnDestroy() {

  }
  onreload(){
    location.reload();
  }
  userlogged(user) {
    console.log(user);
    this.user = user;
    this.email = user.email;
    this.otp = user.otp;
    this.inputOtp = user.inputOtp;
    this.name = user.name;
    this.image = user.image;
    this.visiting_image = this.visiting_image;
    this.comp_name = user.comp_name;
    this.address = user.address;
    this.city = user.city;
    this.state = user.state;
    this.designation = user.designation;
    this.dob = user.dob;
    this.gender = user.gender;
    this.mobile = user.mobile;
    this.personal_email = user.personal_email;
    this.official_email = user.official_email;
    this.present_exp = user.present_exp;
    this.past_exp = user.past_exp;
    this.brief_past = user.brief_past;
    this.refer_by = user.refer_by;
    this.referer_mobile = user.referer_mobile;
    this.remark = user.remark;
    this.status = user.status;
    this.emergency_name = user.emergency_name;
    this.emergency_number = user.emergency_number;
    this.is_update = user.is_update;
    this.country = user.country;

	  // this.user.name=user.name;
	  // this.user.image=user.image;
	  // this.user.mobile=user.mobile;
	  // this.user.personal_email=user.personal_email;
  }
  public openSignupModal() {
    this.signupModal = true;
  }

  public closeModal() {
    this.signupModal = false;
    this.otpModal = false;
    this.sub.unsubscribe();
    this.disableResend = false;
    this.otpModal = false;
    this.displayTimer = false;
    this.disableResend = true;
    this.otpModal = false;
    this.inputOtp = '';
    this.profileModal = false;
  }

  public onLogin() {
    if (!this.mobileNumber) {
      bootbox.alert('Please enter mobile number');
    } else if (this.mobileNumber.toString().length != 10) {
      bootbox.alert('Please enter correct mobile number');
    } else {
      let json = {
        request: {
          type: 'login'
        },
        requestinfo: {
          userid: '',
          name: 'test',
          email_id: 'test@gmail.com',
          mobile: this.mobileNumber,
          type: 'manual'
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
            localStorage.setItem('userid', response.userid);
            localStorage.setItem('user.name', 'test');
            localStorage.setItem('user.personal_email', 'test@gmail.com');
            localStorage.setItem('user.mobile', this.mobileNumber);
			console.log(response.profile_status == 1);
			if(response.profile_status == 1){
				localStorage.setItem('profile_status','true');
			}

            this.otp = response.otp;
          } else if (response.code == 204) {
			  			console.log(response.profile_status == 1);

            localStorage.setItem('userid', response.userid);
            localStorage.setItem('user.name', 'test');
            localStorage.setItem('user.personal_email', 'test@gmail.com');
            localStorage.setItem('user.mobile', this.mobileNumber);
            if(response.profile_status == 1){
				localStorage.setItem('profile_status','true');
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
    return digit <= 9 ? '0' + digit : digit;
  }

  startTimer(){
    this.secondsDisplay = 60;
    this.disableResend = true;
    this.displayTimer = true;
    const timer = Observable.timer(1, 1000);
    this.sub = timer.subscribe(t => {
      this.ticks = t;

      let second = this.getSeconds(this.ticks);
      this.secondsDisplay--;
      if (this.secondsDisplay == 0) {
        this.sub.unsubscribe();
        this.disableResend = false;
        this.inputOtp = '';
        this.otpModal = false;
        this.displayTimer = false;
      }
      else{

      }
    });
  }

  onOtp() {
    if (!this.inputOtp) {
      bootbox.alert('Your enter OTP .');
    } else if (this.otp == this.inputOtp) {
      localStorage.setItem('is_login', 'true');
      this.checkLoginSession = true;
      this.isLogin = true;
      this.closeModal();

    } else {
      bootbox.alert('Your enter OTP is wrong please try again later.');
      this.isLogin = false;
      localStorage.setItem('is_login', 'false');
    }
  }

getProfile(){
    let json = {
      'request': {
        'type': 'get_profile'
      },
      'requestinfo': {
        'name':  localStorage.getItem('user.name'),
        'email_id':localStorage.getItem('user.personal_email'),
        'mobile': localStorage.getItem('user.mobile')
      }
    };
    console.log(localStorage.getItem('userid'));
    this.appComponent.updateshowLoader(true);
    this.homePageService.getProfile(json).subscribe(
      data => {
        this.appComponent.updateshowLoader(false);
        let response = data.response;
        if (response.code == 200) {
         this.user.name = response.name;
         if(response.image != ''){
          this.user.image = response.image
         }

        } else {
          bootbox.alert(response.message);
        }
      },
      err => {}

    );
  }

  getMyProfile() {
    // this.profileModal = true;
    this.profiledata = true;

  }


  upDateProfile(){
    if(!this.user.personal_email){
      bootbox.alert('Please enter email');
    }
    else if (!(this.user.personal_email.toLowerCase().match(this.emailPattern))) {
      bootbox.alert('Please enter valid email');
    }
    else  if (!this.user.mobile) {
      bootbox.alert('Please enter mobile number');
    } else if (this.user.mobile.toString().length != 10) {
      bootbox.alert('Please enter correct mobile number');
    }
    else{
      let json ={
        'request': {
          'type': 'save_profile'
        },
        'requestinfo': {
          'devicetoken': 'dxk1gs-EIe0:APA91bGPwGrfMSzx_HgImyio2V7pNPvYJhZqNNLQW9m1Op7DGHnxUpfJFWgYpbgbzf_vy75xBqJNLAReIpJvplAXvZMYPebhCB31FDq4caEQ6pbdoPBGFaoqYxkfPty7ROodaBiJ8AKR',
          'userid' : localStorage.getItem('userid'),
          'name': this.user.name,
          'image': this.base64textString,
          'visiting_image': this.base64textStringVisit,
          'comp_name': this.user.comp_name,
          'address': this.user.address,
          'city': this.user.city,
          'state': this.user.state,
          'designation': this.user.designation,
          'dob': this.user.dob,
          'gender': this.user.gender,
          'mobile':  this.user.mobile,
          'personal_email': this.user.personal_email,
          'official_email': this.user.official_email,
          'present_exp': this.user.present_exp,
          'past_exp': this.user.past_exp,
          'brief_past': this.user.brief_past,
          'refer_by': this.user.refer_by,
          'referer_mobile': this.user.referer_mobile,
          'remark': this.user.remark,
          'status': this.user.status,
          'emergency_name': this.user.emergency_name,
          'emergency_number': this.user.emergency_number,
          'is_update': '1',
          'country': this.user.country,
          'is_change': '0'
        }
      };
      this.homePageService.updateProfile(json).subscribe(
        data => {
          this.appComponent.updateshowLoader(false);
          let response = data.response;
          if (response.code == 200) {
            bootbox.alert(response.message);
            location.reload();
          } else {
            bootbox.alert(response.message);
          }
        },
        err => {}
      );

    }
  }
  closeProfileModal(){
    this.profileModal = false;
    // this.user.image='';
    //this.user.mobile='';
    // this.user.personal_email='';
    // this.user.image='./../../assets/profile.png';
  }
}
