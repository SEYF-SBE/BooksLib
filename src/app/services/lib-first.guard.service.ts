import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { BookListComponent } from '../book-list/book-list.component';

@Injectable({
  providedIn: 'root'
})
export class LibFirstGuardService {

  private firstNavigation = true;
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.firstNavigation) {
      this.firstNavigation = false;
      if (route.component != BookListComponent) {
        this.router.navigateByUrl("/");
        return false;
      }
    }
    return true;
  }
}
