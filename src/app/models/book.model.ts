export class Book {


	key?: string | null;
	title?: string;
	auther?: string;
	description?: string;
	namePhoto ?: string;
	urlPhoto ?: string;
	file ?: File;
	price ?: number;

	constructor(file : File){
		this.file = file;
	}
	
}