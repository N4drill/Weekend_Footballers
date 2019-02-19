import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'google_logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/google_logo.svg')
    );
  }

  ngOnInit() {
  }

}
