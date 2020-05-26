import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
import { AuthService } from 'app/services/utilities/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticationService.getStatus().pipe(
      map((status) => {
        if (status) {
          if (!status.emailVerified) {
            this.router.navigate(['/session'])
            return false;
          }
          return true;
        } else {
          this.router.navigate(['/session'])
          return false;
        }
      })
    );
  }

}
