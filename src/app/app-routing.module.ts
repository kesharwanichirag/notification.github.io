import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { OtpComponent } from './otp/otp.component';

export const appRoutes:Routes = [
  {
    path:"registration",
    component:RegistrationComponent
  },
  {
    path:"otp",
    component:OtpComponent
  },
  {
    path:"welcome",
    component:WelcomeComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
