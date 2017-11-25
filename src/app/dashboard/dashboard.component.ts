import { Component, OnInit } from '@angular/core';
import{DashboardService} from './dashborad.service'
declare var bootbox: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DashboardService]

})
export class DashboardComponent implements OnInit {
   showLoader=false;
   concilsView:boolean
   officeBearersView:boolean
   carriersView:boolean
   partnerView:boolean
   eventsView:boolean
   newsView:boolean
   registeredVendorView:boolean
   Councils=[];
   News=[];
   Jobs=[];
  constructor(public dashboardService:DashboardService) {
    this.concilsView=true;
    this.officeBearersView=false;
    this.carriersView=false;
    this.partnerView=false;
    this.eventsView=false;
    this.newsView=false;
    this.registeredVendorView=false;
   
    this.getCouncilData();
   }

   getCouncilData(){
     let json={
             "request": {
                 "type": "council"
                 }
            }
            this.showLoader=true
    this.dashboardService.getCouncilData(json).subscribe(
      data=>{
        this.showLoader=false
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
  ngOnInit() {
  }
  showConcilsView(){
    this.concilsView=true;
    this.officeBearersView=false;
    this.carriersView=false;
    this.partnerView=false;
    this.eventsView=false;
    this.newsView=false;
    this.registeredVendorView=false;
    this.getCouncilData();
  }
  showOfficeBarearsView(){
    this.concilsView=false;
    this.officeBearersView=true;
    this.carriersView=false;
    this.partnerView=false;
    this.eventsView=false;
    this.newsView=false;
    this.registeredVendorView=false;
    this.getOfficeBearer();
  }
  getOfficeBearer(){
    let json={
              "request": {
                  "type": "council"
                  }
            }
    this.showLoader=true
    this.dashboardService.getOfficeBearer(json).subscribe(
        data=>{
        this.showLoader=false
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
    this.eventsView=false;
    this.newsView=true;
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
          
      this.showLoader=true
      this.dashboardService.getNews(json).subscribe(
      data=>{
      this.showLoader=false
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
    this.newsView=false;
    this.registeredVendorView=false;
    this.getJobs();
  }

  getJobs(){
    let json={
      "request": {
        "type": "job"
      }
    }
    
    this.showLoader=true
    this.dashboardService.getJobs(json).subscribe(
    data=>{
    this.showLoader=false
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
}
