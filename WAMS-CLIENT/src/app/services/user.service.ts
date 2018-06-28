import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
	public url:string;
	public identity;
	public token;

	constructor( public _http: HttpClient){
		this.url =GLOBAL.url;
	}
	
	register(user: User,token): Observable<any>{
		let params = JSON.stringify(user);
		//console.log("parametros",params);
		let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
		return this._http.post(this.url+'register',params,{headers:headers});
	}
	getCurrentUser(token): Observable<any>{
		//console.log("Token en el Service",token);
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);

		return this._http.get(this.url+'users/get_user/',{headers:headers});
	}
	singup(user,gettoken = null): Observable<any>{
		//console.log(user);
		if(gettoken !=null){
			user.gettoken = gettoken;
		}
		let params =JSON.stringify(user);
		let auth = '{"auth":' + params+ '}'
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.post(this.url+'login',auth,{headers: headers});
	}
	getIdentity(): Observable<any>{
		

		let identity = JSON.parse(localStorage.getItem('identity'));
		if(identity != "undefined"){
			this.identity =identity;
		//	console.log("Desde service get Identity",this.identity);
		}else{
		//	console.log("Identity es nulo");
			this.identity =null;
		}
		return this.identity;
	}
	getUser(id,token): Observable<any>{
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.get(this.url+'get-user/'+id,{headers: headers});
	}
	getUsersList(token): Observable<any>{
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.get(this.url+'users',{headers: headers});
	}
	updateUser(user,token): Observable<any>{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.put(this.url+'users/'+user.id,params,{headers:headers});
	}
	getToken(): Observable<any>{
		let token = localStorage.getItem('token');
		if(token != "undefined"){
			this.token =token;

		}else{
			this.token =null;
		}
		console.log("Token:",token);
		return this.token;
	}

	deleteUser(id,token): Observable<any>{
		let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization',token);
		return this._http.delete(this.url+'ingredients/'+id,{headers: headers});
	}
}