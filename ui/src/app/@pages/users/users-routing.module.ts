import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [
  { 
    path: '', component: UsersComponent, children:[
      { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
