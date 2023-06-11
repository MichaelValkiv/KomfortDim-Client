import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ServicesComponent } from './components/services/services.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationGuardService } from './services/authentication-guard.service';
import { LoginGuardService } from './services/login-guard.service';
import { LogoutGuardService } from './services/logout-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contacts', component: ContactInformationComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'questions', component: QuestionsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [LogoutGuardService],
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
