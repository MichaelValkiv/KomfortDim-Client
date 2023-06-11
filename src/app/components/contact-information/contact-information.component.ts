import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { Meta } from '@angular/platform-browser';
import {
  faMapMarkerAlt,
  faCreditCard,
  faPhone,
  faMobileAlt,
  faEnvelope,
  faCalendarAlt,
  faMugHot,
  faWindowClose,
  faTint,
  faBolt,
  faIdCard,
  faAddressBook,
  faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';
import { ContactsService } from '../../services/contacts.service';
import { Contacts } from '../../models/contacts.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss'],
})
export class ContactInformationComponent implements OnInit, OnDestroy {
  faMapMarkerAlt = faMapMarkerAlt;
  faCreditCard = faCreditCard;
  faPhone = faPhone;
  faMobileAlt = faMobileAlt;
  faEnvelope = faEnvelope;
  faCalendarAlt = faCalendarAlt;
  faMugHot = faMugHot;
  faWindowClose = faWindowClose;
  faTint = faTint;
  faBolt = faBolt;
  faIdCard = faIdCard;
  faAddressBook = faAddressBook;
  faPhoneVolume = faPhoneVolume;

  allContacts: Contacts[];

  contactsGetSubscription: Subscription;

  isDataLoading = true;

  constructor(
    private pageTitle: PageTitleService,
    private metaService: Meta,
    private messageService: MessageService,
    private contactsService: ContactsService
  ) {}

  ngOnInit() {
    this.pageTitle.setTitle('Комфорт-Дім - Контактна Інформація');
    this.metaService.addTags([
      {
        name: 'keywords',
        content:
          // tslint:disable-next-line:max-line-length
          'Комфорт-Дім, Контактні Дані, Управляюча компанія, Калуш, Комфорт, Дім, Управляюча, Компанія, Комфорт-Дім Калуш, Комфорт-Дім Контактні Дані, УК Комфорт-Дім, УК Калуш, Управляюча Компанія Калуш, УК',
      },
      { name: 'author', content: 'MVYV' },
      { name: 'description', content: 'Комфорт-Дім - Контактна Інформація' },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
    ]);
    this.getAllContacts();
  }

  ngOnDestroy() {
    if (this.contactsGetSubscription) {
      this.contactsGetSubscription.unsubscribe();
    }
  }

  getAllContacts() {
    this.contactsGetSubscription = this.contactsService
      .getContactInfo()
      .subscribe(
        (data) => {
          this.allContacts = data;
          this.isDataLoading = false;
        },
        () => {
          this.isDataLoading = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Сталася Помилка. Сервер Не Відповідає.',
            detail: 'Повідомлення від сервера Комфорт-Дім',
            life: 4000,
          });
        }
      );
  }
}
