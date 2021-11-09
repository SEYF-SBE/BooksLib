import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/books.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  bookOld =  new Book(new File([''], ""));
  //book = new Book(new File([""], ""));

  selectedBooks?: FileList;
  currentBookUpload!: Book;
  percentage = 0;

  constructor(private bookService: BookService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.bookOld.key = this.route.snapshot.params['key'];
    this.bookOld.title = this.route.snapshot.params['title'];
    this.bookOld.auther = this.route.snapshot.params['author'];
    this.bookOld.description = this.route.snapshot.params['description'];
    this.bookOld.urlPhoto = this.route.snapshot.params['urlPhoto'];
    this.bookOld.namePhoto = "";
  }

  selectFile(event: any): void {
    this.selectedBooks = event.target.files;
  }

  onUpdate(){
    this.bookService.deleteFile(this.bookOld);
    this.upload();
    this.router.navigate(['/books']);
    //this.submitted = true;
  }

  upload(): void {
    if (this.selectedBooks) {
      const file = this.selectedBooks.item(0);
      this.selectedBooks = undefined;
      this.currentBookUpload = new Book(file as File);
      this.bookService.pushBookToStorage(this.currentBookUpload, this.bookOld).subscribe(
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
