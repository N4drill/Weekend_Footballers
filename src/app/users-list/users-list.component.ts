import { Component, OnInit } from '@angular/core';
import { FakeUsers } from '../../model/fakeusers';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  fakeGoalkeepers: User[];
  fakeDefenders: User[];
  fakeMidfielders: User[];
  fakeStrickers: User[];


  constructor() { }

  ngOnInit() {
    this.initPositionArrays(FakeUsers);
  }


  private initPositionArrays(fakeUsers: User[]) {
    this.fakeGoalkeepers = this.initPositionArray(fakeUsers, 'Bramkarz');
    this.fakeDefenders = this.initPositionArray(fakeUsers, 'Obrońca');
    this.fakeMidfielders = this.initPositionArray(fakeUsers, 'Pomocnik');
    this.fakeStrickers = this.initPositionArray(fakeUsers, 'Napastnik');
  }

  private initPositionArray(fakeUsers: User[], position: string) {
    const result = [];
    fakeUsers.forEach(user => {
      if (user.position === position) {
        result.push(user);
      }
    });
    return result;
  }
}
