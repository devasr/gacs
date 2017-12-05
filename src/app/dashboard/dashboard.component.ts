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
   pdfModal=false;
   categoryId:any;
   hide=true;
   Category:any;
   pdfName:any;
   base64PdftextString:any;
   questionAnswerView=false;
   questionModal=false;
   questionDetail:any;
   base64textString:any;
   Questions=[];
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
    this.questionAnswerView=false;
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
  this.questionAnswerView=false;
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
  this.questionAnswerView=false;
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
    this.questionAnswerView=false;
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
    this.questionAnswerView=false;
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
	console.log(localStorage.getItem("profile_status"))
	if(localStorage.getItem("profile_status")){
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
				
                bootbox.alert(response.message);
            }
        },
        err=>{
          this.showLoader=false
        }
        )
	}else{
		this.user.emit({"name":"New User","image":"./../../assets/profile.png"});
	}
  }
  
   showpartner(){
    this.concilsView=false;
    this.officeBearersView=false;
    this.carriersView=false;
    this.partnerView=true;
    this.eventsView=false;
    this.questionAnswerView=false;
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
    this.questionAnswerView=false;
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

  openPdfModal(){
    this.pdfModal=true;
    this.getCateogory(); 
  }

  getCateogory(){
    this.categoryId="0"
    let json={
      "request": {
        "type": "qna_cat"
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
              this.Category=response.qna_cat;
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
  closePdfModal(){
    this.pdfModal=false
    this.questionModal=false
  }

  handlePdfFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handlePdfReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handlePdfReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
   this.base64PdftextString = btoa(binaryString);
 

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
  
    }
  upLoadPdfData(){
    if(!this.pdfName){
      bootbox.alert("Please enter paper name")
    }
    else if(this.categoryId=="0") {
      bootbox.alert("Please select category")
    }
    else if(!this.base64PdftextString) {
      bootbox.alert("Please upload Pdf file")
    }
    else{

    }
  }


  getQuestions(){
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
            if(response.code==200){
              this.Questions=response.qna_cat;
			      }
            else{
                this.error=true
                bootbox.alert(response.message);
            }
        },
        err=>{
          this.showLoader=false;
        }
        )
  }
  questionAnswer(){
    this.concilsView=false;
		this.officeBearersView=false;
		this.carriersView=false;
		this.partnerView=false;
    this.eventsView=false;
    this.questionAnswerView=true;
		this.newsView=false;
		this.registeredVendorView=false;
    this.knowlegeView=false;
    this.getQuestions();
  }

  openQuestionAnswerModal(){
    this.questionModal=true
    this.getCateogory(); 
  }

  upLoadQuestion(){
    if(this.categoryId=="0") {
      bootbox.alert("Please select category")
    }
    else if(!this.questionDetail) {
      bootbox.alert("Please enter question detail")
    }
    else{

    }
  }
}
