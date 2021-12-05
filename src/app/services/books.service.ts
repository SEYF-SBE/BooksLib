import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private basePath: string = '/books';
  books: AngularFireList<Book>; //  list of objects
  bookRef!: AngularFireObject<any>;
  book!: Observable<any>;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.books = this.db.list(this.basePath);
  }

  // Return a list's observable books
  getAllBooks(): AngularFireList<Book> {
    return this.db.list(this.basePath);
  }

  // to push a book in storage
  pushBookToStorage(book: Book, bookTitleAuthor: Book): Observable<number | undefined> {

    const random = Math.random().toString(36).substr(2, 9);
    const bookPath = `${this.basePath}/${bookTitleAuthor.title}_${bookTitleAuthor.auther}_`+random+'.jpg';
    //const bookPath = `${this.basePath}/${book.file?.name}`+random;
    const storageRef = this.storage.ref(bookPath);
    const uploadTask = this.storage.upload(bookPath, book.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          book.urlPhoto = downloadURL;
          book.namePhoto = bookTitleAuthor.title + '_' + bookTitleAuthor.auther + '_' + random +'.jpg'
          book.title = bookTitleAuthor.title;
          book.auther = bookTitleAuthor.auther;
          book.description = bookTitleAuthor.description;
          book.urlPhoto = downloadURL;
          book.price = bookTitleAuthor.price;
          this.createBook(book);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  //to create a book in realtime deleteBook
  createBook(bookA: Book) {
    return this.books.push(bookA);
  }

  // Return a single observable book
  getBook(key: string): Observable<any> {

    this.bookRef = this.db.object(`/books/${key}`);
    this.book = this.bookRef.valueChanges();
    return this.book;
  }

  // Update an existing item
  updateBook(key: string, value: any): Promise<void> {
    return this.books.update(key, value)
      .catch(error => this.handleError(error))
  }

  // Delete a book by it key from dataBase RealTime and Storage
  deleteFile(book: Book): Promise<void> {
    return this.deleteBook(String(book.key))
      .then(() => {
        this.deleteBookStorage(String(book.urlPhoto));
      }).catch(error => console.log(error));
  }

  // Delete a book by it key from dataBase RealTime
  deleteBook(key: string): Promise<void> {
    return this.books.remove(key).catch(error => this.handleError(error));
  }

  // Delete a book by it photo name from Storage
  deleteBookStorage(url: string) : Promise<void> {
    return this.storage.storage.refFromURL(url).delete();
  }

  // Delete all books
  deleteAll(): Promise<void> {
    this.storage.storage.ref(this.basePath).listAll().then(data => {
      data.items.forEach(item => {
        item.delete();
      });
    })
    return this.books.remove();
  }

  // Default error handling for all actions
  private handleError(error: string) {
    console.log(error)
  }


}
