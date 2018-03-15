import { Component, ViewContainerRef,OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
declare var $;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  aObj:Object = {};
  conformationString:String = "* Please enter name";
  isEmpty:boolean = false;
  constructor(private _router: Router,  private http:Http, private route: ActivatedRoute, private toastr: ToastrService) { 
    //this.fetchData();
    this.fetchApplication();
    $(document).ready(function(){
     
      $('#dt').DataTable();

  });
  }

  // Var declarations
  id:number;
  editobj : {};
  uApplication = [];
  uData:object = {};
  uExist = false;
  private headers = new Headers({ 'Content-Type': 'roles/json'});
  role = [];
  applications = [];

   //get res by app_id
session_id=sessionStorage.getItem('app_id');

  // Fetch Role
  fetchData=function() {
    this.http.get("http://localhost:3000/api/role/Roles").subscribe(
      (res: Response) => {
        this.role = res.json();
        console.log(this.role);
        console.log(this.role.Application_id)
      }
    )
   }

   // Fetch Application
   fetchApplication=function() {
    this.http.get("http://localhost:3000/api/Applications").subscribe(
      (res: Response) => {
        this.applications = res.json();
        console.log(this.applications);
      }
    )
   }

   //Refresh Page
   refresh = function() {
    window.location.reload();
  }
   //Del Role
   deleteRole = function(id) {
    
    const url = "http://localhost:3000/api/role/delRole/" + id;
    return this.http.delete(url, {headers: this.headers}).toPromise()
      .then(() => {
        this.appRole(this.session_id);
        //this.fetchData();
        $('#deleteModal').modal('toggle');
      this.toastr.error('Role Deleted.');
        
      })
  
  }

  attributeIdToBeDeleted : String;
  attributeNameToBeDeleted : String;

  // Set Delete Attribute
  setDeleteAttribute = (_id, Name) => {
    this.attributeIdToBeDeleted = _id;
    this.attributeNameToBeDeleted = Name;
  }

//Add Role
addNewRole = function(a) {
 // if(a.name != "") {
   //console.log(a.name);
   if(a.Role_name==undefined||a.Role_name===null||a.Role_name==='') {
    this.toastr.error("Role name required.")
   }
   else {
  this.aObj = {
    "Role_id":a.id,
    "Role_name":a.Role_name,
    "displayname":a.displayname,
    "Application_id":this.session_id
  }
  this.http.post("http://localhost:3000/api/role/addRole" , this.aObj ,  {Headers : this.headers} ).subscribe(res => {
    console.log(res);
    console.log(this.aObj);
if(res._body=="unique") {
  this.toastr.error('Role already exists.');
}
else {
  this.appRole(this.session_id);
  $('#addModal').modal('toggle');
  this.toastr.success('Roles Added.');
}
  
  },
  err=> {
    //this.toastr.error('Role already exists343434.');
   })
  }
//}
// else{
//   this.toastr.error("Role name required.")
//   this.isEmpty = true;
// }
}
//Edit Roles

editRole = function(id) {
 
  this.http.get("http://localhost:3000/api/role/"+id).subscribe(
     (res: Response) => {
       this.uApplication = res.json();
       console.log(res.json());
       this.uData = this.uApplication;
       console.log(this.uData);
 
 
     }
   )
 
 }


  

appRole = function(session_id) {

  this.http.get("http://localhost:3000/api/role/fetchByAppId/"+session_id).subscribe(
   (res: Response) => {
     this.role = res.json();

     //console.log(this.appData);


  
   }
  )
  }

 //Update Role
 updateRole = function(updateData,id)
{
  
  console.log(id);

  if(updateData.uRole_name != "") {
    console.log(updateData.uRole_name);
    this.editObj = {
      "Role_id":updateData.id,
      "Role_name":updateData.uRole_name,
      "Application_id":this.session_id
    }
    this.http.put("http://localhost:3000/api/role/updateRole/"+ id  , this.editObj ,  {Headers : this.headers} ).subscribe((res:Response) => {
      console.log(res);
      $('#updateModal').modal('toggle');
      this._router.navigate(['/roles']);
      this.appRole(this.session_id);
      //this.fetchData();
    this.toastr.info('Role Updated.');

  
    })
}
}
ngOnInit() {
  //this.fetchData();
  $(document).ready(function(){
   
    $('#dt').DataTable();

});
  //this.fetchData();
  this.appRole(this.session_id);
  

}

}
