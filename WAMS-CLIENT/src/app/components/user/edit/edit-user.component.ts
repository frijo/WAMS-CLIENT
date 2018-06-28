import { Component, OnInit, EventEmitter, Input,Output } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { User } from '../../../models/user';

@Component({
	selector: 'sel-edit-user',
	templateUrl: './edit-user.component.html',
	providers:[UserService]

})
export class EditUserComponent implements OnInit{
	public title:string;
	public user: User;
	public status:string;
	public token;

	@Input('userInfo') userInfo: User;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
		
	){
		this.title= 'Editar Usuario';
		//this.ingredient = new  Ingredient( 0,"","",0 ,0 ,0,"","");
		this.user = new  User();
		
	}
	ngOnInit(){

		console.log('Componete de Editar Usuario esta cargado...');
		this.token= this._userService.getToken();
		this.status="";
		/*this._route.params.subscribe(params =>{
			let id = params['id'];
			this.getIngredient(id);

		});*/
		this.getUser(this.userInfo.id);		
	
	}
	@Output() edited = new EventEmitter();
	sendUser($event){
		this.edited.emit({send:true});
	}
	getUser(id){

		this._userService.getUser(id,this.token).subscribe(
			response =>{
				if(response.user && response.user.id){
					console.log(response);
					this.user= response.user;
					
					
				}else{
					
					console.log(response);
				}
			},
			error =>{
				console.log(<any>error);

			}
		);
	}
	onSubmit(form,$event){
		this._userService.updateUser(this.user,this.token).subscribe(
			response =>{
				if(response.user && response.user.id){
					console.log(response);

					this.status='success';
					form.reset();
				//	this._router.navigate(['/ingredients']);
				}else{
					this.status='error';
					console.log(response);
				}
			},
			error =>{
				console.log(<any>error);

			}
		);



	}

}