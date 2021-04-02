import { Injectable } from '@angular/core';
import {LoginModel} from '../../entities/login-model';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JwtModel} from '../../entities/jwt-model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new Subject();

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  public login(loginModel: LoginModel): Observable<any> {
    this.httpClient.post<JwtModel>(environment.backendUrl + '/auth/login', loginModel).subscribe(
      data => {
          // Это не безопастно. По-хорошему надо хранить в httpOnly куке.
          this.cookieService.set('jwt', data.jwt);
          this.subject.next(true);
      },
      error => {
          this.subject.next(false);
          console.log(error);
      });
    return this.subject.asObservable();
  }

  public exit(): void {
    this.cookieService.delete('jwt');
    location.reload();
  }

  public isAuthenticated(): boolean {
    return this.cookieService.check('jwt');
  }

  public getJwt(): string {
    return this.cookieService.get('jwt');
  }
}
