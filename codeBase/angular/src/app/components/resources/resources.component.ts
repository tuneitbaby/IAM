import {Fetch_Resource,addResource,Resource,Resource_fetchByAppId,UpdateResource,DeleteResource,Applications,resourceTypes,ResourceType_fetchByAppId,allAttributes,attributes_fetchByAppId,fetchByAppAndType} from '../../routeConfig';
import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { resource } from 'selenium-webdriver/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { LoadingModule } from 'ngx-loading';

declare var $;

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  public loading = false;
  aObj:Object = {};
  conformationString:String = "* Please enter name";
  isEmpty:boolean = false;
  constructor(private _router: Router,  private http:Http, private route: ActivatedRoute, private toastr: ToastrService) {
    this.appRes(this.session_id);
    //this.fetchData();
    this.fetchResourceType();
    // this.fetchApplications();
    this.fetchAttribute();
}
  // Var declarations
  id: number;
  editobj : {};
  uresource = [];
  uData:object = {};
  appData = [];
  uExist = false;
  private headers = new Headers({ 'Content-Type': 'resources/json'});
  resource = [];
  applications = [];
  resourcetype = [];
  attribute = [];
  attributes = [];
  attribute_id = "";
  attribute_value = "";

  p: number = 1;
  collection: any[] = this.resource;  
  key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  pushAction = function() {
    if(!(this.attribute_id == "" || this.attribute_value == "")) {
      var object = {
        attribute_id : this.attribute_id,
        attribute_value:this.attribute_value
      };
      this.attributes.push(object);
      this.attribute_id = "";
      this.attribute_value = "";
    } else {
      this.toastr.error("Please give attribute and it's value.");
    }
  }
  //get res by app_id
session_id=sessionStorage.getItem('app_id');

  removeAction = function(index) {
    this.attributes.splice(index,1);
  }

  fetchData=function() {
    this.http.get(Resource).subscribe(
      (res: Response) => {
        this.resource = res.json();
      }
    )
   }


FetchClick=function(){
  this.fetchResourceType();
  this.fetchApplications();
  this.fetchAttribute();
  //this.addNewRes();
}

//Fetch Applications
fetchApplications=function() {
  this.http.get(Applications).subscribe(
    (res: Response) => {
      this.applications = res.json();
    }
  )
 }
 //Fetch ResourceType
 fetchResourceType=function() {
  this.http.get(ResourceType_fetchByAppId+this.session_id).subscribe(
    (res: Response) => {
      this.resourcetype = res.json();
    }
  )
 }
 //Fetch Attribute
 fetchAttribute=function() {
  this.http.get(fetchByAppAndType+this.session_id)
  .map(res => res.json() )
  .subscribe(
    res => {
      console.log(res);
      // let a = [];
      // let obj = res;
      // let att = obj.Attributes;
      // for(let i = 0 ; i < att.length ; i++){
      //   //console.log(i);
      //   if(att[i].Type == "Fixed"){
      //     a.push(att[i]);
      //   }
      // }
      this.attribute = res;
    }
  )
 }


//Refresh Page
refresh = function() {
  window.location.reload();
}

//Del App
deleteRes = function(id) {
  this.http.delete(DeleteResource + id).subscribe(
    res => {
      if(res._body=="used") {
        this.appRes(this.session_id);
        this.toastr.error('Resource is already in use.');
        $('#deleteModal').modal('toggle');
      }
      else {
        this.appRes(this.session_id);
        this.toastr.error('Resource Deleted..');
        $('#deleteModal').modal('toggle');
      }
     
    },
    err => this.toastr.error('Ops! something went wrong.'))
}

//Add App
addNewRes = function(a) {
  if(a.res_name==undefined||a.res_name==""||a.res_name==null) {
    this.toastr.error("Resource name required.")
   }
   else {
    this.aObj = {
      "res_name":a.res_name,
      "res_displayname":a.res_displayname,
      "Resource_typeid":a.Resource_typeid,
      "application_id":this.session_id,
      "attributes":this.attributes,
      "res_descrpition":a.res_descrpition
    }

  
    this.http.post(addResource , this.aObj ,  {Headers : this.headers} ).subscribe(res => {
      if(res._body=="unique") {
        this.toastr.error('Resource already exists.');
        this.attributes=[];
      }
      else {
        this.appRes(this.session_id);
        $('#addModal').modal('toggle');
        this.toastr.success('Resource Added.');
        this.attributes=[];
      }
    
    },
    err=> {
      //this.toastr.error('Resource already exists.');
     })


}
}
   

//Edit App

editRes = function(id) {

this.http.get(Resource+id).subscribe(
 (res: Response) => {
   this.uresource = res.json();
   this.uData = this.uresource;
   this.attributes = this.uData.attributes;
 }
)
}


appRes = function(session_id) {
  this.loading = true;
  this.http.get(Resource_fetchByAppId+session_id).subscribe(
   (res: Response) => {
    this.loading = false;
     this.resource = res.json();
     this._router.navigate(['/resources']);
   }
  )
  }  

  attributeIdToBeDeleted : String;
  attributeNameToBeDeleted : String;

  // Set Delete Attribute
  setDeleteAttribute = (_id, Name) => {
    this.attributeIdToBeDeleted = _id;
    this.attributeNameToBeDeleted = Name;
  }

//Upd App

updateRes = function(updateData,id)
{
  if(updateData.ures_name==undefined||updateData.ures_name==""||updateData.ures_name==null) {
    this.toastr.error("Resource name required.")
   }
   else{
    this.editObj = {
      "res_name":updateData.ures_name,
      "res_displayname":updateData.ures_displayname,
      "Resource_typeid":updateData.uResource_typeid,
      "application_id":this.session_id,
      "attributes":this.attributes,
      "attribute_value":updateData.uattribute_value,
      "res_description":updateData.ures_descrpition
    }
    this.http.put(UpdateResource+ id  , this.editObj ,  {Headers : this.headers} ).subscribe((res:Response) => {
      $('#updateModal').modal('toggle');
      this._router.navigate(['/resources']);
    this.appRes(this.session_id);
    this.toastr.info('Resource Updated.');

  
    })
}
}


  ngOnInit() {
  
    this.appRes(this.session_id);
  }

}
