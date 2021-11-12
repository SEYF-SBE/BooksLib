import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SignleBookComponent } from './book-list/signle-book/signle-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { BookService } from './services/books.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './auth/forget-password/forget-password.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { EditBookComponent } from './book-list/edit-book/edit-book.component';
import { SplitPipe } from './book-list/book-form/split.pipe';
import { CartService } from './services/cart.service';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component'; //
import { LibFirstGuardService } from './services/lib-first.guard.service';
import { OrderService } from './services/order.service';
import { Order } from './models/Order.model';


const appRoutes: Routes = [

  { path: 'books', canActivate: [LibFirstGuardService], component: BookListComponent }, // canActivate: [AuthGuardService],  
  { path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent },
  { path: 'books/edit/:key/:title/:author/:description/:urlPhoto/:namePhoto/:price', canActivate: [AuthGuardService], component: EditBookComponent },
  { path: 'books/view/:key', component: SignleBookComponent }, // canActivate: [AuthGuardService],
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'cart',  component: CartComponent }, //canActivate: [LibFirstGuardService],
  { path: 'checkout', component: CheckoutComponent },//canActivate: [LibFirstGuardService],
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' }
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SignleBookComponent,
    BookFormComponent,
    HeaderComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    EditBookComponent,
    SplitPipe,
    CartComponent,
    CheckoutComponent //
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, // RealTime db
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage 

    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    BookService,
    CartService,
    LibFirstGuardService,
    OrderService,
    Order
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
