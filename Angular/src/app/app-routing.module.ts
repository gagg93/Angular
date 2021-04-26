import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from './tables/users/users.component';
import {DashboardComponent} from './app-components/dashboard/dashboard.component';
import {VehiclesComponent} from './tables/vehicles/vehicles.component';
import {FormComponent} from './app-components/form/form.component';
import {ReservationsComponent} from './tables/reservations/reservations.component';
import {LoginComponent} from './auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'reservations', children: [{path: '', component: ReservationsComponent}, {path: 'edit/reservation/:id', component: FormComponent},
      {path: 'new/reservation', component: FormComponent}, {path: 'delete/reservation/:id', component: ReservationsComponent}]},
  { path: 'users', children: [{path: '', component: UsersComponent}, {path: 'edit/user/:id', component: FormComponent},
      {path: 'new/user', component: FormComponent}, {path: 'delete/user/:id', component: UsersComponent}]},
  { path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  { path: 'vehicles', children: [{path: '', component: VehiclesComponent}, {path: 'edit/vehicle/:id', component: FormComponent},
      {path: 'new/vehicle', component: FormComponent}, {path:  'delete/vehicle/:id', component: VehiclesComponent} ]},
  { path: 'login', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, {enableTracing: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
