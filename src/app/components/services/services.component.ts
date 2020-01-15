import {Component, OnInit, OnDestroy} from '@angular/core';
import {PageTitleService} from '../../services/page-title.service';
import {Meta} from '@angular/platform-browser';
import {
  faBroom,
  faHouseDamage,
  faWind,
  faHammer,
  faLightbulb,
  faToolbox,
  faTools,
  faBath,
  faTemperatureHigh,
  faBolt,
  faWater,
  faTint,
  faBriefcase
} from '@fortawesome/free-solid-svg-icons';
import {ServicesService} from '../../services/services.service';
import {Services} from '../../models/services.model';
import {Subscription} from 'rxjs/internal/Subscription';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {

  faBroom = faBroom;
  faHouseDamage = faHouseDamage;
  faWind = faWind;
  faHammer = faHammer;
  faLightbulb = faLightbulb;
  faToolbox = faToolbox;
  faTools = faTools;
  faBath = faBath;
  faTemperatureHigh = faTemperatureHigh;
  faBolt = faBolt;
  faWater = faWater;
  faTint = faTint;
  faBriefcase = faBriefcase;

  allServices: Services[];

  servicesGetSubscription: Subscription;

  isDataLoading: boolean = true;

  constructor(private pageTitle: PageTitleService,
              private metaService: Meta,
              private messageService: MessageService,
              private servicesService: ServicesService) {
  }

  ngOnInit() {
    this.pageTitle.setTitle('Комфорт-Дім - Наші Послуги');
    this.metaService.addTags([
      {
        name: 'keywords',
        content: 'Комфорт-Дім, Послуги, Управляюча компанія, Калуш, Комфорт, Дім, Управляюча, Компанія, Комфорт-Дім Калуш, Комфорт-Дім Послуги, УК Комфорт-Дім, УК Калуш, Управляюча Компанія Калуш, УК'
      },
      {name: 'author', content: 'MVYV'},
      {name: 'description', content: 'Комфорт-Дім - Запитання'}
    ]);
    this.getAllServices();
  }

  ngOnDestroy() {
    if (this.servicesGetSubscription) {
      this.servicesGetSubscription.unsubscribe();
    }
  }

  getAllServices() {
    this.servicesGetSubscription = this.servicesService.getServiceInfo().subscribe(
      data => {
        this.allServices = data;
        this.isDataLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Успішно Завантажено Послуги, Які Надає Компанія.',
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

}
