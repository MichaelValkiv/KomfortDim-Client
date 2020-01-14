import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { Meta } from '@angular/platform-browser';
import {faBell, faTimes, faCheck, faExclamationTriangle, faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { Notifications } from '../../models/notifications.model';
import { NotificationsService } from '../../services/notifications.service';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  faBell = faBell;
  faTimes = faTimes;
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faCheck = faCheck;
  faExclamationTriangle = faExclamationTriangle;

  displayForm: boolean = false;
  displayDeleteDialog: boolean = false;

  allNotifications: Notifications[];
  newOrEditedNotification: Notifications;
  isNewNotification: boolean;
  isLoadingNotifications: boolean;

  getNotificationSubscription: Subscription;
  postNotificationSubscription: Subscription;
  putNotificationSubscription: Subscription;
  deleteNotificationSubscription: Subscription;

  isDataLoading: boolean = true;

  constructor( private pageTitle: PageTitleService,
               private metaService: Meta,
               private notificationsService: NotificationsService,
               private messageService: MessageService,
               public authenticationService: AuthenticationService ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Комфорт-Дім - Оголошення');
    this.metaService.addTags([
      {
        name: 'keywords',
        content: 'Комфорт-Дім, Оголошення, Управляюча компанія, Калуш, Комфорт, Дім, Управляюча, Компанія, Комфорт-Дім Калуш, Комфорт-Дім Оголошення'
      },
      {name: 'author', content: 'MVYV'},
      {name: 'description', content: 'Комфорт-Дім - Запитання'}
    ]);
    this.notificationsGet();
    this.newOrEditedNotification = new Notifications();
  }

  ngOnDestroy() {
    if (this.getNotificationSubscription) { this.getNotificationSubscription.unsubscribe(); }
    if (this.postNotificationSubscription) { this.postNotificationSubscription.unsubscribe(); }
    if (this.putNotificationSubscription) { this.putNotificationSubscription.unsubscribe(); }
    if (this.deleteNotificationSubscription) { this.deleteNotificationSubscription.unsubscribe(); }
  }

  showForm() {
    this.displayForm = true;
  }

  showDeleteDialog() {
    this.displayDeleteDialog = true;
  }

  hideDeleteDialog() {
    this.displayDeleteDialog = false;
  }

  notificationsGet() {
    this.getNotificationSubscription = this.notificationsService.getNotificationInfo().subscribe(
      data => {
        this.allNotifications = data;
        this.isDataLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Успішно Завантажено Список Оголошень.',
          detail: 'Повідомлення від сервера Комфорт-Дім',
          life: 4000
        });
      }, () => {
        this.isDataLoading = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Сталася Помилка. Сервер Не Відповідає.',
          detail: 'Повідомлення від сервера Комфорт-Дім',
          life: 4000
        });
      });
  }

  addNewNotification() {
    this.newOrEditedNotification = new Notifications();
    this.displayForm = true;
    this.isNewNotification = true;
  }

  editNotification(notificationInfo: Notifications) {
    this.isNewNotification = false;
    this.newOrEditedNotification = new Notifications(
      notificationInfo.id,
      notificationInfo.notification,
      notificationInfo.notification_date
    );
  }

  addOrModifyNotification() {
    if (this.isNewNotification) {
      this.newOrEditedNotification.id = null;
      this.newOrEditedNotification.notification_date = null;
      this.postNotificationSubscription = this.notificationsService.postNotificationInfo(this.newOrEditedNotification).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Зміни Успішно Збережено.',
            detail: 'Повідомлення від сервера Комфорт-Дім',
            life: 4000
          });
          this.notificationsGet();
        }, () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Сталася Помилка. Зміни не внесено.',
            detail: 'Повідомлення від сервера Комфорт-Дім',
            life: 4000
          });
          this.notificationsGet();
        });
    } else {
      this.putNotificationSubscription = this.notificationsService.putNotificationInfo(this.newOrEditedNotification).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Зміни Успішно Збережено.',
            detail: 'Повідомлення від сервера Комфорт-Дім',
            life: 4000
          });
          this.notificationsGet();
        }, () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Сталася Помилка. Зміни не внесено.',
            detail: 'Повідомлення від сервера Комфорт-Дім',
            life: 4000
          });
          this.notificationsGet();
        });
    }
  }

  deleteNotification() {
    this.deleteNotificationSubscription = this.notificationsService.deleteNotificationInfo(this.newOrEditedNotification).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успішно Видалено.',
          detail: 'Повідомлення від сервера Комфорт-Дім',
          life: 4000
        });
        this.notificationsGet();
      }, () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Сталася Помилка. Видалення Не Відбулося.',
          detail: 'Повідомлення від сервера Комфорт-Дім',
          life: 4000
        });
        this.notificationsGet();
      });
  }

}
