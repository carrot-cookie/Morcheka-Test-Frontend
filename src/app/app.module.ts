import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgbDateAdapter, NgbDateNativeUTCAdapter, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {AuthService} from './services/auth.service';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CreateUserComponent } from './components/modal/create-user/create-user.component';
import { EditProfileComponent } from './components/modal/edit-profile/edit-profile.component';
import { EditCredentialsComponent } from './components/modal/edit-credentials/edit-credentials.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileCardComponent,
    PaginatorComponent,
    CreateUserComponent,
    EditProfileComponent,
    EditCredentialsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgbModalModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
