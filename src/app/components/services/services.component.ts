import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { Meta } from '@angular/platform-browser';
import {
  faBroom,
  faHouseDamage,
  faWind,
  faHammer,
  faLightbulb,
  faToolbox,
  faTools,
  faTemperatureHigh,
  faPlug,
  faWater,
  faTint,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
import { ServicesService } from '../../services/services.service';
import { Services } from '../../models/services.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit, OnDestroy {
  faBroom = faBroom;
  faHouseDamage = faHouseDamage;
  faWind = faWind;
  faHammer = faHammer;
  faLightBulb = faLightbulb;
  faToolbox = faToolbox;
  faTools = faTools;
  faTemperatureHigh = faTemperatureHigh;
  faBolt = faPlug;
  faWater = faWater;
  faTint = faTint;
  faBriefcase = faBriefcase;

  allServices: Services[];

  servicesGetSubscription: Subscription;

  isDataLoading = true;

  constructor(
    private pageTitle: PageTitleService,
    private metaService: Meta,
    private messageService: MessageService,
    private servicesService: ServicesService
  ) {}

  ngOnInit() {
    this.pageTitle.setTitle('Комфорт-Дім - Наші Послуги');
    this.metaService.addTags([
      {
        name: 'keywords',
        content:
          // tslint:disable-next-line:max-line-length
          'Комфорт-Дім, Послуги, Управляюча компанія, Калуш, Комфорт, Дім, Управляюча, Компанія, Комфорт-Дім Калуш, Комфорт-Дім Послуги, УК Комфорт-Дім, УК Калуш, Управляюча Компанія Калуш, УК',
      },
      { name: 'author', content: 'MVYV' },
      { name: 'description', content: 'Комфорт-Дім - Послуги' },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
    ]);
    this.getAllServices();
  }

  ngOnDestroy() {
    if (this.servicesGetSubscription) {
      this.servicesGetSubscription.unsubscribe();
    }
  }

  getAllServices() {
    this.servicesGetSubscription = this.servicesService
      .getServiceInfo()
      .subscribe(
        (data) => {
          this.allServices = data;
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
