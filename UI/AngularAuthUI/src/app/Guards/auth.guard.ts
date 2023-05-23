import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard1 implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['signin']);
      return false;
    }
  }
}


// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../Services/auth.service';


// export const authGuard: CanActivateFn = (route, state) => {
//   if (AuthService.isLoggedIn()) {
//     return true;
//   } else {
//     Router.navigate(['/login']);
//     return false;
//   }
// };
