import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';

import { HeroService } from './services/hero.service';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth.service';
import { TokenInterceptor, ErrorInterceptor } from './services/token.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.states';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    SignUpComponent,
    LogInComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot([
      { path: '', component: DashboardComponent},
      { path: 'log-in', component: LogInComponent},
      { path: 'sign-up', component: SignUpComponent},
      { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard]},
      { path: 'detail/:id', component: HeroDetailComponent, canActivate: [AuthGuard]},
      { path: '**', redirectTo: '/'},
    ]),
    HttpClientModule
  ],
  providers: [HeroService, MessageService, AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
