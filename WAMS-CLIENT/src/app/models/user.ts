export class User{

	constructor(
		public id?: number,
		public username?: string,
		public email?: string,
		public password?:string,
		public password_confirmation?:string,
		public show?:boolean,
		public role?: string,
		public image?: string,
	
	){
		
	}
}