import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuardService {

  constructor(public auth: AuthService,
              public router: Router) { }
  
  public canActivate(): boolean{
    if(!this.auth.getToken()){
      this.router.navigateByUrl('/log-in');
      return false;
    }
    return true;
  }
}
