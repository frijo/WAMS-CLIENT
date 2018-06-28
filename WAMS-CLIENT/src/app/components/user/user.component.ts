import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
	selector: 'sel-user',
	templateUrl: './user.component.html',
	providers:[UserService]

})
export class UserComponent implements OnInit{
	
	public title:string;
	public status:string;
	public token;
	public users:User[];
	public identity;
	constructor(
	
		private _router: Router,
		private _route: ActivatedRoute,
		private _userService: UserService
	){
		this.title= 'Lista de Usuarios';
	//	this.show = false;
	}
	ngOnInit(){
		this.identity= this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.getUsers();
		console.log("Componente Usuarios");
	}
	getUsers(){
		
		this._userService.getUsersList(this.token).subscribe(
			response=>{
				if(!response){
					this.status='error, no hay usuarios';
					
				}
				else{
					
					this.status='success';
					this.users= response.users;
					this.users = this.users.map(function(user) {
					      user.show = false;   
					      return user;
					});
					
					console.log(this.users);
				}
			},
			error=>{
				var errorMessage = <any>error;
				console.log(errorMessage);
				
				if(errorMessage != null){
					this.status='error'
				}
			}
		);
	}
	deleteUser(id){
		this._userService.deleteUser(id,this.token).subscribe(
			response=>{
				console.log(response);
				this.status='success';
				this.refresh();
				
			},
			error=>{
				console.log(<any>error);

				this.status='error';
			}
		);
	}
	refresh($event=null){
		this.getUsers();
	}
	toggleVisibility(index: number){
		this.users[index].show = !this.users[index].show;
		//event.target.classList.toggle('visible');
	}	


}