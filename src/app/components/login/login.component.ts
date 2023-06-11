import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { PageTitleService } from '../../services/page-title.service';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  faUser = faUser;
  faKey = faKey;
  username = '';
  password = '';
  invalidLogin = false;
  authSubscription: Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private pageTitle: PageTitleService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.pageTitle.setTitle('Комфорт-Дім - Вхід');
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  checkLogin() {
    if (!this.username || !this.password) {
      return;
    }
    this.authSubscription = this.authenticationService
      .authenticate(this.username, this.password)
      .subscribe(
        () => {
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
          this.invalidLogin = false;
        },
        (error) => {
          if (error.status === 401) {
            this.messageService.add({
              severity: 'error',
              summary: 'Неправильний логін, чи пароль.',
              detail: 'Повідомлення від сервера Комфорт-Дім',
              life: 4000,
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Сталася Помилка.',
              detail: 'Повідомлення від сервера Комфорт-Дім',
              life: 4000,
            });
          }
          this.invalidLogin = true;
        }
      );
  }
}
