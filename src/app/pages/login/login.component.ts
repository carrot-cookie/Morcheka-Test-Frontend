import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;
  error = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public tryToLogin(): void {
    this.authService.login({login: this.login, password: this.password}).subscribe(
      value => {
        value ? this.router.navigate(['']) : this.error = true;
      }
    );
  }

}
