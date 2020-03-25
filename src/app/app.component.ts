import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Login to Clean Code Center';

  constructor(private authenticationService: AuthenticationService) {
  }

  requestLogin() {
    this.authenticationService.requestLogin('user');
  }
}
