import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { Meta } from '@angular/platform-browser';
import {
  faHome,
  faBuilding,
  faCity,
  faWarehouse,
  faCalculator,
  faMarker,
} from '@fortawesome/free-solid-svg-icons';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  faHome = faHome;
  faBuilding = faBuilding;
  faCity = faCity;
  faWarehouse = faWarehouse;
  faCalculator = faCalculator;
  faMarker = faMarker;

  companyCharacteristics: Company[];

  companyGetSubscription: Subscription;

  isDataLoading = true;

  constructor(
    private pageTitle: PageTitleService,
    private metaService: Meta,
    private messageService: MessageService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.pageTitle.setTitle('Комфорт-Дім - Опис Компанії');
    this.metaService.addTags([
      {
        name: 'keywords',
        content:
          // tslint:disable-next-line:max-line-length
          'Комфорт-Дім, Характеристика, Управляюча компанія, Калуш, Комфорт, Дім, Управляюча, Компанія, Комфорт-Дім Калуш, Комфорт-Дім Характеристика, УК Комфорт-Дім, УК Калуш, Управляюча Компанія Калуш, УК',
      },
      { name: 'author', content: 'MVYV' },
      {
        name: 'description',
        content: 'Комфорт-Дім - Управляюча Компанія м. Калуш',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
    ]);
    this.getCompanyCharacteristics();
  }

  ngOnDestroy() {
    if (this.companyGetSubscription) {
      this.companyGetSubscription.unsubscribe();
    }
  }

  getCompanyCharacteristics() {
    this.companyGetSubscription = this.companyService
      .getCompanyInfo()
      .subscribe(
        (data) => {
          this.companyCharacteristics = data;
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
