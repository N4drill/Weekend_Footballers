import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent} from './login/login.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { UsersListComponent} from './users-list/users-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'login', component: LoginComponent},
  {path: 'form', component: PlayerFormComponent},
  {path: 'players', component: UsersListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
