import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireObject } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-signle-book',
  templateUrl: './signle-book.component.html',
  styleUrls: ['./signle-book.component.scss']
})
export class SignleBookComponent implements OnInit {

  book = {
    //key: '',
    title: '',
    auther: '', 
    namePhoto: '',
    urlPhoto: '',
    description: '',
    price:''
  };

  constructor(private bookService : BookService,
              private route: ActivatedRoute,
              private router: Router, 
              private cartService : CartService) { }

  ngOnInit(): void {
    const key = this.route.snapshot.params['key'];
    this.bookService.getBook(key).subscribe(item => this.book = item);
  }

  onBack(){
    this.router.navigate(['/books']);
  }

  // ajouter un livre au panier 
  addProductToCart() {
    
    let newBook = new Book(new File([''], ""));
    
    newBook.title = this.book.title;
    newBook.price = Number(this.book.price);
    newBook.key = this.route.snapshot.params['key'];

    this.cartService.addLine(newBook);
  }

}
