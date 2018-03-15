import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastrService } from 'ngx-toastr';

declare var $;

@Component({
  selector: 'app-administrative-users',
  templateUrl: './administrative-users.component.html',
  styleUrls: ['./administrative-users.component.css']
})
export class AdministrativeUsersComponent implements OnInit {

  aObj:Object = {};
  conformationString:String = "* Please enter name";
  isEmpty:boolean = false;
  constructor(private _router: Router,  private http:Http, private route: ActivatedRoute, private toastr: ToastrService) {
    this.fetchData();
    $(document).ready(function(){
     
      $('#dt').DataTable();

  });
}

// Var declarations
id: number;
editobj : {};
uresource = [];
uData:object = {};
uExist = false;
private headers = new Headers({ 'Content-Type': 'resources/json'});
user = [];
roles = [];
addRole = [];

role = '';
pushAction = function() {
  if(this.role != '') {
    let object = {
      role_id: this.role
    };
   this.addRole.push(object);
   this.role = "";
  }
  console.log(this.addRole);
}

removeAction = function(index) {
  this.addRole.splice(index,1);
}

fetchRoles=function() {
  this.http.get("http://localhost:3000/api/role/Roles").subscribe(
    (res: Response) => {
      this.roles = res.json();
      console.log(this.roles);
    }
  )
 }


fetchData=function() {
  this.http.get("http://localhost:3000/api/users/all").subscribe(
    (res: Response) => {
      this.user = res.json();
      console.log(this.user);
    }
  )
 }

 //Refresh Page
refresh = function() {
  window.location.reload();
  this._router.navigate(['/adminUsers']);
  this.toastr.info('Page Reloaded.');
}

attributeIdToBeDeleted : String;
attributeNameToBeDeleted : String;

// Set Delete Attribute
setDeleteAttribute = (_id, Name) => {
  this.attributeIdToBeDeleted = _id;
  this.attributeNameToBeDeleted = Name;
}

//Del App
deleteUser = function(id) {
 
  const url = "http://localhost:3000/api/DelUser/" + id;
  return this.http.delete(url, {headers: this.headers}).toPromise()
    .then(() => {
    this.fetchData();
    this.toastr.error('User Deleted.');
    $('#deleteModal').modal('toggle');
   this._router.navigate(['/app/admin-user']);
  
    })
 
 }
 
 //Add App
 addNewUser = function(a) {
  if(a.res_name != "") {
  this.aObj = {
    "name":a.name,
	  "username":a.username,
    "password":a.password,
	  "email":a.email,
	  "role":this.addRole
  }
  console.log(this.aObj);
  
  this.http.post("http://localhost:3000/api/user/Add" , this.aObj ,  {Headers : this.headers} ).subscribe((res:Response) => {
    console.log(res);
  this.fetchData();
  $('#addModal').modal('toggle');
  this.toastr.success('User Added.');
  })
 }
 else{
  this.isEmpty = true;
 }
 }
 
  editUser = function(id) {
 //this.toastr.info('User Updated.');
 this.http.get("http://localhost:3000/api/user/"+id).subscribe(
  (res: Response) => {
    this.uresource = res.json();
    console.log(res.json());
    this.uData = this.uresource;
    this.addRole = this.uData.role;
    console.log(this.uData);

 
 
  }
 )
 }
 
 
 //Upd App
 
 updateUser = function(updateData,id)
 {
   
   console.log(id);
 
   if(updateData.name != "") {
     console.log(updateData.name);
   
	this.editObj = {
       "name":updateData.name,
       "username":updateData.username,
       "password":updateData.password,
       "email":updateData.email,
       "role":this.addRole,
	   "status":updateData.status
     }
     console.log(this.editObj);
 
     this.http.put("http://localhost:3000/api/UpdateUser/"+ id  , this.editObj ,  {Headers : this.headers} ).subscribe((res:Response) => {
       console.log(res);
       $('#updateModal').modal('toggle');
       this._router.navigate(['/admin-user']);
     this.fetchData();
     this.toastr.info('User Updated.');
 
   
     })
 }
 }
 
 
   ngOnInit() {
     this.fetchData();
     $(document).ready(function(){
      
       $('#dt').DataTable();
 
   });
     this.fetchData();
     this.fetchRoles();
   }

}
