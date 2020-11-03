import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/Operators';
import { AuthService } from 'app/services/utilities/auth.service';
import { UserService } from 'app/services/user.service';
import { CompanyService } from 'app/services/company.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthService, private userService: UserService, private companyService: CompanyService, private router: Router) { }
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

          this.userService.getUserByEmail(status.email).then((user => {
            localStorage.setItem('userLoged', JSON.stringify(user[0]))
            if (user[0].Company) {
              this.companyService.getCompany(user[0].Id_company).pipe(take(1)).toPromise().then(response => {
                localStorage.setItem('companyLoged', JSON.stringify(response))
              })
            }
          }))

          return true;
        } else {
          this.router.navigate(['/session'])
          return false;
        }
      })
    );
  }

}
