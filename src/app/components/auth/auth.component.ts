import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  // Whether to enable auth or not 
  enableAuth : boolean = true;

  constructor(
    private cookieService : CookieService
  ) { }

  ngOnInit(): void {

    // Check if authenticated or not 
    if(this.cookieService.check('auth')) {
      this.enableAuth = false;
    }

  }

  // Auth form submit
  onAuth(form: NgForm) {
    if(form.valid) {
      if(form.value.password==='chalil') {
        this.cookieService.set('auth', 'true', 1);
        this.enableAuth = false;
      }
    }
  }

}
