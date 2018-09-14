import { Component, OnInit } from '@angular/core';
import { AppState, selectAuthState } from '../../store/app.states';
import { Store } from '@ngrx/store';
import { LogOut } from '../../store/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public getState: Observable<any>;
  public isAuthenticated = false;
  public user = null;
  public errorMessage = null;
  
  constructor(private store: Store<AppState>) { 
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    })
  }

  private logOut(): void{
    this.store.dispatch(new LogOut({}))
  }

}
