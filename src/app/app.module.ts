import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
} from '@angular/material';
import { HeaderComponent } from './components/header/header.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ServicesComponent } from './components/services/services.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { DataViewModule } from 'primeng/dataview';
import { CompanyService } from './services/company.service';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { MessageService } from 'primeng/api';
import { ContactsService } from './services/contacts.service';
import { ServicesService } from './services/services.service';
import { QuestionsService } from './services/questions.service';
import { NotificationsService } from './services/notifications.service';
import { HttpUrlInterceptorService } from './services/http-url-interceptor.service';

import { QuillModule } from 'ngx-quill';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactInformationComponent,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    PageNotFoundComponent,
    QuestionsComponent,
    NotificationsComponent,
    ServicesComponent,
    DashboardComponent,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatListModule,
    FontAwesomeModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    InputTextareaModule,
    TabViewModule,
    DataViewModule,
    ScrollToModule.forRoot(),
    DialogModule,
    DropdownModule,
    PanelModule,
    ToastModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    QuillModule.forRoot(),
  ],
  exports: [
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
  ],
  providers: [
    CompanyService,
    ContactsService,
    ServicesService,
    QuestionsService,
    NotificationsService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpUrlInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
