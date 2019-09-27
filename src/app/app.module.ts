import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { PaymentComponent } from './payment/payment.component';
import { BookedConfirmationComponent } from './booked-confirmation/booked-confirmation.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DetailsDialogComponent,
    PaymentComponent,
    BookedConfirmationComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  entryComponents: [
    DetailsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
