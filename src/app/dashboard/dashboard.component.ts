import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import {DashboardService} from './dashborad.service';
import { AppComponent } from '../app.component';
declare var bootbox: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DashboardService]

})
export class DashboardComponent implements OnInit {
   showLoader:boolean;
   concilsView:boolean
   officeBearersView:boolean
   carriersView:boolean
   partnerView:boolean
   profileView:boolean
   eventsView:boolean
   newsView:boolean
   knowlegeView:boolean
   registeredVendorView:boolean
   Councils=[];
   error:any;
   News=[];
   Knowledge=[];
   Jobs=[];
   partner=[];
   profile=[];
   @Output() user: EventEmitter<any> = new EventEmitter<any>();
   
  constructor(public dashboardService:DashboardService,public appComponent:AppComponent) {
    this.concilsView=true;
    this.officeBearersView=false;
    this.carriersView=false;
    this.partnerView=false;
	this.knowlegeView=false;
    this.eventsView=false;
    this.newsView=false;
	this.profileView=false;
    this.registeredVendorView=false;

    this.showConcilsView();
	this.getShowprofile();
   }

   getCouncilData(){
	let json={
		"request": {
			"type": "council"
		}
	}
    this.appComponent.updateshowLoader(true)
    this.dashboardService.getCouncilData(json).subscribe(
      data=>{
        this.appComponent.updateshowLoader(false)
            let response=data.response;
            if(response.code==200){
              this.Councils=response.COUNCIL
            }
            else{
                bootbox.alert(response.message);
            }
		},
		err=>{
		  this.showLoader=false
		}
	)}
	
  ngOnInit() {
  }
  showConcilsView(){
    this.concilsView=true;
    this.officeBearersView=false;
    this.carriersView=false;
	this.knowlegeView=false;
    this.partnerView=false;
    this.eventsView=false;
    this.newsView=false;
	this.profileView=false;
    this.registeredVendorView=false;

    this.getCouncilData();
  }
  showOfficeBarearsView(){
    this.concilsView=false;
    this.officeBearersView=false;
    this.carriersView=false;
    this.partnerView=false;
	this.knowlegeView=false;
    this.eventsView=false;
	this.profileView=false;
    this.newsView=false;
    this.registeredVendorView=false;
  //  this.getOfficeBearer();
  }
  getOfficeBearer(){
    let json={
              "request": {
                  "type": "council"
                  }
            }
    this.appComponent.updateshowLoader(true)
    this.dashboardService.getOfficeBearer(json).subscribe(
        data=>{
          this.appComponent.updateshowLoader(false)
            let response=data.response;
            if(response.code==200){
              this.Councils=response.COUNCIL
            }
            else{
                bootbox.alert(response.message);
            }
        },
        err=>{
          this.showLoader=false
        }
        )
  }
  showNewsView(){
    this.concilsView=false;
    this.officeBearersView=false;
    this.carriersView=false;
    this.partnerView=false;
	this.knowlegeView=false;
    this.eventsView=false;
    this.newsView=true;
	this.profileView=false;
    this.registeredVendorView=false;
    this.getNews();
  }

  getNews(){
          let json={
                  "request": {
                   "type": "news"
                 },
                "requestinfo": {
                "userid": "1600"
                }
          }

      this.appComponent.updateshowLoader(true)
      this.dashboardService.getNews(json).subscribe(
      data=>{
        this.appComponent.updateshowLoader(false)
          let response=data.response;
          if(response.code==200){
            this.News=response.data
          }
          else{
              bootbox.alert(response.message);
          }
      },
      err=>{
        this.showLoader=false
      }
      )
  }
  showcarriersView(){
    this.concilsView=false;
    this.officeBearersView=false;
    this.carriersView=true;
    this.partnerView=false;
    this.eventsView=false;
	this.knowlegeView=false;
    this.newsView=false;
    this.registeredVendorView=false;
	this.profileView=false;
    this.getJobs();
  }

  getJobs(){
    let json={
      "request": {
        "type": "job"
      }
    }

    this.appComponent.updateshowLoader(true)
    this.dashboardService.getJobs(json).subscribe(
    data=>{
      this.appComponent.updateshowLoader(false)
        let response=data.response;
        if(response.code==200){
          this.Jobs=response.data
        }
        else{
            bootbox.alert(response.message);
        }
    },
    err=>{
      this.showLoader=false
    }
    )
  }
  
  showprofile(){
    this.concilsView=false;
    this.officeBearersView=false;
    this.carriersView=false;
	this.knowlegeView=false;
    this.partnerView=false;
    this.eventsView=false;
    this.newsView=false;
    this.registeredVendorView=false;
	this.profileView=true;
    this.getShowprofile();
  }
  getShowprofile(){
    let json={
		"request": {
			"type": "profile_data"
		},
		"requestinfo": {
			"userid": localStorage.getItem("userid")
		}
	}
    this.appComponent.updateshowLoader(true)
    this.dashboardService.getOfficeBearer(json).subscribe(
        data=>{
          this.appComponent.updateshowLoader(false)
            let response=data.response;
            if(response.code==200){
              this.profile=[response.data];
			  this.user.emit(response.data);
            }
            else{
				this.user.emit({name:"New User",image:"./../../assets/profile.png"});
                bootbox.alert(response.message);
            }
        },
        err=>{
          this.showLoader=false
        }
        )
  }
  
   showpartner(){
    this.concilsView=false;
    this.officeBearersView=false;
    this.carriersView=false;
    this.partnerView=true;
    this.eventsView=false;
    this.newsView=false;
	this.knowlegeView=false;
	this.registeredVendorView=false;
    this.getShowpartner();
  }
  getShowpartner(){
    let json={
		"request": {
			"type": "partners_list"
		}
	}

    this.appComponent.updateshowLoader(true)
    this.dashboardService.getOfficeBearer(json).subscribe(
        data=>{
          this.appComponent.updateshowLoader(false)
            let response=data.response;
            if(response.code==200){
              this.partner=response.message;
            }
            else{
                bootbox.alert(response.message);
            }
        },
        err=>{
          this.showLoader=false
        }
        )
  }
  
	knowBank(){
		this.concilsView=false;
		this.officeBearersView=false;
		this.carriersView=false;
		this.partnerView=false;
		this.eventsView=false;
		this.newsView=false;
		this.registeredVendorView=false;
		this.knowlegeView=true;
		this.getknowBank();
	}
  getknowBank(){
    let json={
		"request": {
			"type": "question"
		}
	}

    this.appComponent.updateshowLoader(true)
    this.dashboardService.getOfficeBearer(json).subscribe(
        data=>{
          this.appComponent.updateshowLoader(false)
            let response=data.response;
            if(response.code==204){
			if(response.data){
              this.Knowledge=response.data;
			}
			  if(response.data===undefined){
				this.error=response.message;
			  }
            }
            else{				
                bootbox.alert(response.message);
            }
        },
        err=>{
          this.showLoader=false;
        }
        )
  }
}
