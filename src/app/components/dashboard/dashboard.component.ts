import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { CompanyService } from '../../services/company.service';
import { ContactsService } from '../../services/contacts.service';
import { ServicesService } from '../../services/services.service';
import { Company } from '../../models/company.model';
import { SortOptions } from '../../models/sort_options.model';
import {
  faPencilAlt,
  faTrashAlt,
  faPlusSquare,
  faDatabase,
  faExclamationTriangle,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Contacts } from '../../models/contacts.model';
import { Services } from '../../models/services.model';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';

interface ContactTypes {
  name: string;
  value: string;
}

interface ServiceTypes {
  name: string;
  value: string;
}

interface CharacteristicTypes {
  name: string;
  value: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faPlusSquare = faPlusSquare;
  faDatabase = faDatabase;
  faExclamationTriangle = faExclamationTriangle;
  faCheck = faCheck;
  faTimes = faTimes;

  company: Company[];
  contact: Contacts[];
  komfortService: Services[];

  companySortOptions: SortOptions[];
  contactSortOptions: SortOptions[];
  serviceSortOptions: SortOptions[];

  sortKey: string;
  sortField: string;
  sortOrder: number;

  displayCompanyForm = false;
  displayContactForm = false;
  displayServiceForm = false;
  displayDeleteDialog = false;

  newOrEditedCompanyInfo: Company;
  newOrEditedContactInfo: Contacts;
  newOrEditedServiceInfo: Services;

  isNewCompanyInfo: boolean;
  isNewContactInfo: boolean;
  isNewServiceInfo: boolean;

  isLoadingCompanyInfo = false;
  isLoadingContactInfo = false;
  isLoadingServiceInfo = false;

  databaseKey: string;
  contactTypes: ContactTypes[];
  serviceTypes: ServiceTypes[];
  characteristicTypes: CharacteristicTypes[];
  selectedContact: any;
  selectedService: any;
  selectedCharacteristic: any;

  getCompanySubscription: Subscription;
  getContactSubscription: Subscription;
  getServiceSubscription: Subscription;

  postCompanySubscription: Subscription;
  postContactSubscription: Subscription;
  postServiceSubscription: Subscription;

  putCompanySubscription: Subscription;
  putContactSubscription: Subscription;
  putServiceSubscription: Subscription;

  deleteCompanySubscription: Subscription;
  deleteContactSubscription: Subscription;
  deleteServiceSubscription: Subscription;

  constructor(
    private pageTitle: PageTitleService,
    private companyService: CompanyService,
    private contactsService: ContactsService,
    private servicesService: ServicesService,
    private messageService: MessageService
  ) {
    this.contactTypes = [
      {
        name: 'Контактна Інформація Компанії (Державні Реєстри)',
        value: 'company_contact_country',
      },
      {
        name: 'Контактна Інформація Компанії (Адреса)',
        value: 'company_contact_location',
      },
      {
        name: 'Контактна Інформація Компанії (Банківські Реквізити)',
        value: 'company_contact_bank',
      },
      {
        name: 'Контактна Інформація Компанії (Стаціонарний Телефон)',
        value: 'company_contact_phone',
      },
      {
        name: 'Контактна Інформація Компанії (Мобільний номер)',
        value: 'company_contact_mobile',
      },
      {
        name: 'Контактна Інформація Компанії (Електронна Пошта)',
        value: 'company_contact_email',
      },
      { name: 'Графік Роботи Компанії', value: 'company_schedule' },
      {
        name: 'Графік Роботи Компанії (Обід)',
        value: 'company_schedule_dinner',
      },
      {
        name: 'Графік Роботи Компанії (Вихідні)',
        value: 'company_schedule_weekend',
      },
      { name: 'Телефони Диспетчерських Служб', value: 'company_phones' },
      {
        name: 'Телефони Диспетчерських Служб (Сантехніки)',
        value: 'company_phones',
      },
      {
        name: 'Телефони Диспетчерських Служб (Електромонтери)',
        value: 'company_phones',
      },
      { name: 'Загальний Контактний Запис', value: 'company_default' },
    ];
    this.serviceTypes = [
      { name: 'Тип Послуги (Прибирання)', value: 'cleaning' },
      { name: 'Тип Послуги (Водопостачання)', value: 'water_supply' },
      { name: 'Тип Послуги (Водовідведення)', value: 'drainage_system' },
      { name: 'Тип Послуги (Теплопостачання)', value: 'heat_supply' },
      { name: 'Тип Послуги (Електропостачання)', value: 'power_supply' },
      { name: 'Тип Послуги (Зливова Каналізація)', value: 'storm_sewer' },
      {
        name: 'Тип Послуги (Внутрішньоквартирні Мережі)',
        value: 'interior_network',
      },
      { name: 'Тип Послуги (Димовентиляційні Канали)', value: 'smoke_vents' },
      {
        name: 'Тип Послуги (Технологічні Пристрої Будинків)',
        value: 'houses_technological_devices',
      },
      {
        name: 'Тип Послуги (Системи Диспетчеризації)',
        value: 'dispatching_systems',
      },
      { name: 'Тип Послуги (Освітлення)', value: 'lighting' },
      {
        name: 'Тип Послуги (Обслуговування Ліфтів)',
        value: 'elevator_service',
      },
      { name: 'Тип Послуги (Загальний Тип Послуги)', value: 'default_service' },
    ];
    this.characteristicTypes = [
      { name: 'Тип Характеристики (Будинків Загалом)', value: 'all_houses' },
      {
        name: 'Тип Характеристики (Будинків З Ліфтами)',
        value: 'elevator_houses',
      },
      { name: 'Тип Характеристики (Ліфти)', value: 'elevators' },
      {
        name: 'Тип Характеристики (Загальна Площа Будинків)',
        value: 'overall_area',
      },
      {
        name: 'Тип Характеристики (Кількість Квартир Загалом)',
        value: 'number_of_apartments',
      },
      {
        name: 'Тип Характеристики (Нежитлових Приміщень Загалом)',
        value: 'warehouses',
      },
      {
        name: 'Тип Характеристики (Загальна Характеристика)',
        value: 'default',
      },
    ];
  }

  ngOnInit() {
    this.pageTitle.setTitle('Комфорт-Дім - Адміністрування');
    this.companyInfoGet();
    this.contactInfoGet();
    this.serviceInfoGet();

    this.companySortOptions = [
      { label: 'Назва [ А-Я ]', value: 'characteristic' },
      { label: 'Назва [ Я-А ]', value: '!characteristic' },
      { label: 'Тип Характеристики [ А-Я ]', value: 'characteristic_type' },
      { label: 'Тип Характеристики [ Я-А ]', value: '!characteristic_type' },
    ];

    this.contactSortOptions = [
      { label: 'Назва [ А-Я ]', value: 'contact' },
      { label: 'Назва [ Я-А ]', value: '!contact' },
      { label: 'Тип Контактних Даних [ А-Я ]', value: 'contact_type' },
      { label: 'Тип Контактних Даних [ Я-А ]', value: '!contact_type' },
    ];

    this.serviceSortOptions = [
      { label: 'Назва [ А-Я ]', value: 'service_name' },
      { label: 'Назва [ Я-А ]', value: '!service_name' },
      { label: 'Тип Послуги [ А-Я ]', value: 'service_type' },
      { label: 'Тип Послуги [ Я-А ]', value: '!service_type' },
    ];

    this.newOrEditedCompanyInfo = new Company();
    this.newOrEditedContactInfo = new Contacts();
    this.newOrEditedServiceInfo = new Services();
  }

  ngOnDestroy() {
    if (this.getCompanySubscription) {
      this.getCompanySubscription.unsubscribe();
    }
    if (this.getContactSubscription) {
      this.getContactSubscription.unsubscribe();
    }
    if (this.getServiceSubscription) {
      this.getServiceSubscription.unsubscribe();
    }

    if (this.postCompanySubscription) {
      this.postCompanySubscription.unsubscribe();
    }
    if (this.postContactSubscription) {
      this.postContactSubscription.unsubscribe();
    }
    if (this.postServiceSubscription) {
      this.postServiceSubscription.unsubscribe();
    }

    if (this.putCompanySubscription) {
      this.putCompanySubscription.unsubscribe();
    }
    if (this.putContactSubscription) {
      this.putContactSubscription.unsubscribe();
    }
    if (this.putServiceSubscription) {
      this.putServiceSubscription.unsubscribe();
    }

    if (this.deleteCompanySubscription) {
      this.deleteCompanySubscription.unsubscribe();
    }
    if (this.deleteContactSubscription) {
      this.deleteContactSubscription.unsubscribe();
    }
    if (this.deleteServiceSubscription) {
      this.deleteServiceSubscription.unsubscribe();
    }
  }

  showCompanyForm() {
    this.displayCompanyForm = true;
  }

  showContactForm() {
    this.displayContactForm = true;
  }

  showServiceForm() {
    this.displayServiceForm = true;
  }

  showDeleteDialog(dbKey: string) {
    this.displayDeleteDialog = true;
    this.databaseKey = dbKey;
  }

  hideDeleteDialog() {
    this.displayDeleteDialog = false;
  }

  companyInfoGet() {
    this.getCompanySubscription = this.companyService
      .getCompanyInfo()
      .subscribe(
        (data) => {
          this.company = data;
          this.isLoadingCompanyInfo = false;
        },
        () => {
          this.isLoadingCompanyInfo = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Сталася Помилка. Сервер Не Відповідає.',
            detail: 'Повідомлення від сервера Комфорт-Дім',
            life: 4000,
          });
        }
      );
  }

  contactInfoGet() {
    this.getContactSubscription = this.contactsService
      .getContactInfo()
      .subscribe(
        (data) => {
          this.contact = data;
          this.isLoadingContactInfo = false;
        },
        () => {
          this.isLoadingContactInfo = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Сталася Помилка. Сервер Не Відповідає.',
            detail: 'Повідомлення від сервера Комфорт-Дім',
            life: 4000,
          });
        }
      );
  }

  serviceInfoGet() {
    this.getServiceSubscription = this.servicesService
      .getServiceInfo()
      .subscribe(
        (data) => {
          this.komfortService = data;
          this.isLoadingServiceInfo = false;
        },
        () => {
          this.isLoadingServiceInfo = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Сталася Помилка. Сервер Не Відповідає.',
            detail: 'Повідомлення від сервера Комфорт-Дім',
            life: 4000,
          });
        }
      );
  }

  addNewCompanyInfo() {
    this.newOrEditedCompanyInfo = new Company();
    this.displayCompanyForm = true;
    this.isNewCompanyInfo = true;
  }

  addNewContactInfo() {
    this.newOrEditedContactInfo = new Contacts();
    this.displayContactForm = true;
    this.isNewContactInfo = true;
  }

  addNewServiceInfo() {
    this.newOrEditedServiceInfo = new Services();
    this.displayServiceForm = true;
    this.isNewServiceInfo = true;
  }

  editCompanyInfo(companyInfo: Company) {
    this.isNewCompanyInfo = false;
    this.newOrEditedCompanyInfo = new Company(
      companyInfo.id,
      companyInfo.characteristic,
      companyInfo.characteristic_value,
      companyInfo.characteristic_type
    );
  }

  editContactInfo(contactInfo: Contacts) {
    this.isNewContactInfo = false;
    this.newOrEditedContactInfo = new Contacts(
      contactInfo.id,
      contactInfo.contact,
      contactInfo.contact_type
    );
  }

  editServiceInfo(serviceInfo: Services) {
    this.isNewServiceInfo = false;
    this.newOrEditedServiceInfo = new Services(
      serviceInfo.id,
      serviceInfo.service_name,
      serviceInfo.service_type
    );
  }

  addOrModifyCompanyInfo() {
    if (this.isNewCompanyInfo) {
      this.newOrEditedCompanyInfo.id = null;
      this.newOrEditedCompanyInfo.characteristic_type =
        this.selectedCharacteristic.name;
      this.postCompanySubscription = this.companyService
        .postCompanyInfo(this.newOrEditedCompanyInfo)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Зміни Успішно Збережено.',
              detail: 'Повідомлення від сервера Комфорт-Дім',
              life: 4000,
            });
            this.companyInfoGet();
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Сталася Помилка. Зміни не внесено.',
              detail: 'Повідомлення від сервера Комфорт-Дім',
              life: 4000,
            });
            this.companyInfoGet();
          }
        );
    } else {
      this.newOrEditedCompanyInfo.characteristic_type =
        this.selectedCharacteristic.name;
      this.putCompanySubscription = this.companyService
        .putCompanyInfo(this.newOrEditedCompanyInfo)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Зміни Успішно Збережено.',
              detail: 'Повідомлення від сервера Комфорт-Дім',
              life: 4000,
            });
            this.companyInfoGet();
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Сталася Помилка. Зміни не внесено.',
              detail: 'Повідомлення від сервера Комфорт-Дім',
              life: 4000,
            });
            this.companyInfoGet();
          }
        );
    }
  }

  addOrModifyContactInfo() {
    if (this.isNewContactInfo) {
      this.newOrEditedContactInfo.id = null;
      this.newOrEditedContactInfo.contact_type = this.selectedContact.name;
      this.postContactSubscription = this.contactsService
        .postContactInfo(this.newOrEditedContactInfo)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Зміни Успішно Збережено.',
              detail: 'Повідомлення від сервера Комфорт-Дім',
              life: 4000,
            });
            this.contactInfoGet();
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Сталася Помилка. Зміни не внесено.',
              detail: 'Повідомлення від сервера Комфорт-Дім',
              life: 4000,
            });
            this.contactInfoGet();
          }
        );
    } else {
      this.newOrEditedContactInfo.contact_type = this.selectedContact.name;
      this.putContactSubscription = this.contactsService
        .putContactInfo(this.newOrEditedContactInfo)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Зміни Успішно Збережено.',
              detail: 'Повідомлення від сервера Комфорт-Дім',
              life: 4000,
            });
            this.contactInfoGet();
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Сталася Помилка. Зміни не внесено.',
              detail: 'Повідомлення від сервера Комфорт-Дім',
              life: 4000,
            });
            this.contactInfoGet();
          }
        );
    }
  }

  addOrModifyServiceInfo() {
    if (this.isNewServiceInfo) {
      this.newOrEditedServiceInfo.id = null;
      this.newOrEditedServiceInfo.service_type = this.selectedService.name;
      this.postServiceSubscription = this.servicesService
        .postServiceInfo(this.newOrEditedServiceInfo)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Зміни Успішно Збережено.',
              detail: 'Повідомлення від сервера Комфорт-Дім',
              life: 4000,
            });
            this.serviceInfoGet();
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Сталася Помилка. Зміни не внесено.',
              detail: 'Повідомлення від сервера Комфорт-Дім',
              life: 4000,
            });
            this.serviceInfoGet();
          }
        );
    } else {
      this.newOrEditedServiceInfo.service_type = this.selectedService.name;
      this.putServiceSubscription = this.servicesService
        .putServiceInfo(this.newOrEditedServiceInfo)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Зміни Успішно Збережено.',
              detail: 'Повідомлення від сервера Комфорт-Дім',
              life: 4000,
            });
            this.serviceInfoGet();
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Сталася Помилка. Зміни не внесено.',
              detail: 'Повідомлення від сервера Комфорт-Дім',
              life: 4000,
            });
            this.serviceInfoGet();
          }
        );
    }
  }

  deleteCompanyInfo() {
    this.deleteCompanySubscription = this.companyService
      .deleteCompanyInfo(this.newOrEditedCompanyInfo)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Успішно Видалено.',
            detail: 'Повідомлення від сервера Комфорт-Дім',
            life: 4000,
          });
          this.companyInfoGet();
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Сталася Помилка. Видалення Не Відбулося.',
            detail: 'Повідомлення від сервера Комфорт-Дім',
            life: 4000,
          });
          this.companyInfoGet();
        }
      );
  }

  deleteContactInfo() {
    this.deleteContactSubscription = this.contactsService
      .deleteContactInfo(this.newOrEditedContactInfo)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Успішно Видалено.',
            detail: 'Повідомлення від сервера Комфорт-Дім',
            life: 4000,
          });
          this.contactInfoGet();
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Сталася Помилка. Видалення Не Відбулося.',
            detail: 'Повідомлення від сервера Комфорт-Дім',
            life: 4000,
          });
          this.contactInfoGet();
        }
      );
  }

  deleteServiceInfo() {
    this.deleteServiceSubscription = this.servicesService
      .deleteServiceInfo(this.newOrEditedServiceInfo)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Успішно Видалено.',
            detail: 'Повідомлення від сервера Комфорт-Дім',
            life: 4000,
          });
          this.serviceInfoGet();
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Сталася Помилка. Видалення Не Відбулося.',
            detail: 'Повідомлення від сервера Комфорт-Дім',
            life: 4000,
          });
          this.serviceInfoGet();
        }
      );
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
