import { Component, OnInit } from '@angular/core';
import { FakeUsers } from '../../model/fakeusers';
import { User } from '../../model/user.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Constants } from 'src/constants/constants';
import { take } from 'rxjs/operators';

interface UserURLMap {
  user: User;
  photo: any;
}
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  private usersCollection: AngularFirestoreCollection<User>;

  goalkeepers: UserURLMap[] = [];
  defenders: UserURLMap[] = [];
  midfielders: UserURLMap[] = [];
  strickers: UserURLMap[] = [];

  allUsers: User[];
  allArrays: any;


  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.usersCollection = this.afs.collection<User>(`${Constants.FirestoreColletions.USERS}`);
    this.usersCollection.valueChanges().subscribe((usersArray) => {
      this.allUsers = usersArray;
      this.getUsers();
      this.allArrays = [
        { name: 'Goalkeepers', usersMap: this.goalkeepers },
        { name: 'Defenders', usersMap: this.defenders },
        { name: 'Midfielders', usersMap: this.midfielders },
        { name: 'Strickers', usersMap: this.strickers }
      ];
    });
  }

  private getUsers() {
    this.allUsers.forEach(u => {
      this.storage.ref(u.photoURL).getDownloadURL()
        .pipe(take(1))
        .subscribe(url => {
          this.placeUser(u, url);
        });
    });
  }

  placeUser(u: User, url) {
    switch (u.position) {
      case 'Bramkarz':
        this.goalkeepers.push({
          user: u,
          photo: url
        });
        break;
      case 'Obrońca':
        this.defenders.push({
          user: u,
          photo: url
        });
        break;
      case 'Pomocnik':
        this.midfielders.push({
          user: u,
          photo: url
        });
        break;
      case 'Napastnik':
        this.strickers.push({
          user: u,
          photo: url
        });
        break;
    }
  }
}
