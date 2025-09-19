import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { CourseComponent } from './pages/course/course.component';
import { ServiceComponent } from './pages/service/service.component';
import { TrainerComponent } from './pages/trainer/trainer.component';
import { TrainerDetailComponent } from './pages/trainer/trainer-detail.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/auth/login.component';
import { RegisterComponent } from './pages/auth/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WorkoutHistoryComponent } from './pages/workout-history/workout-history.component';
import { RegistrationHistoryComponent } from './pages/registration-history/registration-history.component';
import { NavbarComponent } from './shared/navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CourseComponent,
    ServiceComponent,
    TrainerComponent,
    TrainerDetailComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    WorkoutHistoryComponent,
    RegistrationHistoryComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
