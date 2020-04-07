import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from './main/user-info/user-info.component';
import { MainPageComponent } from './main/main-page/main-page.component';
import { CreateUserComponent } from './main/create-user/create-user.component';
import { AddressComponent } from './main/address/address.component';
import { RegistrationComponent } from './main/registration/registration.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'address', component: AddressComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
