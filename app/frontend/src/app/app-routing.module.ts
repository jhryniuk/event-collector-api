import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from "./login/login.component";
import { EventComponent } from "./event/event.component";
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'events',
    component: EventComponent,
  },
  {
    path: 'events/:event',
    component: EventComponent,
  },
  {
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'users/:user',
    component: UserComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'errors',
    loadChildren: () => import('./errors/errors.module').then(m => m.ErrorModule),
  },
  {
    path: '**',
    redirectTo: '/errors/not-found',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
