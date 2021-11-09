import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireObject } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signle-book',
  templateUrl: './signle-book.component.html',
  styleUrls: ['./signle-book.component.scss']
})
export class SignleBookComponent implements OnInit {

  /*@Input() book?: Book;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentBook: Book = {
    title: '',
    auther: ''
  };
  
  message = '';

  constructor(private bookService : BookService) { }

  ngOnInit(): void {
    this.message = '';
  }

  updateBookC(): void {
    const data = {
      title: this.currentBook.title,
      auther: this.currentBook.auther
    };

    if (this.currentBook.key) {
      this.bookService.updateBook(this.currentBook.key, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteBook(){
    if (this.currentBook.key) {
      this.bookService.deleteBook(this.currentBook.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }*/
  //book !: AngularFireObject<Book>;
  book = {
    title: '',
    auther: '', 
    namePhoto: '',
    urlPhoto: '',
    description: ''
  };

  constructor(private bookService : BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const key = this.route.snapshot.params['key'];
    this.bookService.getBook(key).subscribe(item => this.book = item);
  }

  onBack(){
    this.router.navigate(['/books']);
  }

}
