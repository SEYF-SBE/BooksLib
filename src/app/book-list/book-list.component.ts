import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/books.service';
import { map } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { Router } from '@angular/router';

// import Auth to know if user is connected or notFound
import { AuthService } from '../services/auth.service';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Console } from 'console';

declare var $: any;

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books?: Book[];
  currentBook?: Book;
  currentIndex = -1;
  title = '';
  message = '';
  isAuthInList: boolean = false;
  userDisplayName!: string | null;

  constructor(private bookService: BookService,
              private router : Router,
              private authService: AuthService) { }

  ngOnInit(): void {


    

    this.getBooksList();

    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user){
          this.isAuthInList = true;
          this.userDisplayName = user.displayName;
          console.log("displayName : " + this.userDisplayName);
        }else{
          this.isAuthInList = false;
        }
      }
    );
  }

  refreshList(): void {
    this.currentBook = undefined;
    this.currentIndex = -1;
    this.getBooksList();
  }

  getBooksList(): void {
    this.bookService.getAllBooks().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.books = data; 
    });
  }

  setActiveBook(book: Book, index: number): void {
    this.currentBook = book;
    this.currentIndex = index;
    this.router.navigate(['/books', 'view' , book.key]);  //
  }

  deleteAllBooks(){
    this.bookService.deleteAll().then(() => this.refreshList())
      .catch(err => console.log(err));
  }

  onNewBook(){
    this.router.navigate(['/books', 'new']); //
  }

  // added
  onDeleteBookFromList(book : Book){
    if (book.key) {
      this.bookService.deleteFile(book)
        .then(() => {
          this.refreshList();
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

  // To know if Book's list is empty or not
  isEmptyObject(objs : any) {
      return (objs && (Object.keys(objs).length === 0));
  }

  // To update a book
  onUpdateBook(book: Book){
    this.router.navigate(['/books', 'edit', book.key, book.title, book.auther, book.description, book.urlPhoto, book.namePhoto, book.price]);
  }


}
