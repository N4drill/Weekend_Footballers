import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { of, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  navbarOpen = false;
  avatarImage$: Observable<string>;

  constructor(public auth: AuthService, private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      if (user !== null) {
        this.updateAvatar(user);
      }
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  async updateAvatar(user) {
    this.avatarImage$ = this.storage.ref(user.photoURL).getDownloadURL();
  }
}
