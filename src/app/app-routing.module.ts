import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { BookedConfirmationComponent } from './booked-confirmation/booked-confirmation.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        data: { name: 'HOME' }
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
      {
        path: 'booked-confirmation',
        component: BookedConfirmationComponent
      }
    ]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
