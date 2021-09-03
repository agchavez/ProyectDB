import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../sevices/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
        private auth:AuthService,
        private route:Router
  ){}
  canActivate():  boolean {
    if(this.auth.isAutenticated()){
      return true;
    }else{
      this.route.navigateByUrl('/login')

    }
  }
  
}
