import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  book = new Book(new File([""], ""));
  submitted = false;
  
  selectedBooks?: FileList;
  currentBookUpload!: Book;
  percentage = 0;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  createBook() {
    this.upload();
    this.submitted = true;
  }

  newBook(): void {
    const file = new File([""], "");
    this.submitted = false;
    this.book = new Book(file); // reset book
  }

  selectFile(event: any): void {
    this.selectedBooks = event.target.files;
  }

  upload(): void {
    if (this.selectedBooks) {
      const file = this.selectedBooks.item(0);
      this.selectedBooks = undefined;
      this.currentBookUpload = new Book(file as File);
      this.bookService.pushBookToStorage(this.currentBookUpload, this.book).subscribe(
        percentage => {
          this.percentage = Math.round(percentage ? percentage : 0);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
