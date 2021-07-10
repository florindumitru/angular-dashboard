import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAdminAuthGuard implements CanActivate {
  constructor(
    private auth: AuthService, private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.auth.isLoggedIn && this.auth.isAdmin()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }


}
