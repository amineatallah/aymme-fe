import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { HomeService } from '../shared/home.service';
import { ToastrService } from 'ngx-toastr';
import * as servicesSelectors from '../state/services/services.selectors';
import * as servicesActions from '../state/services/services.actions';
import { tap, catchError } from 'rxjs/operators';
import { Endpoint } from '../shared/service.interface';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  isInitializing = true;
  allHidden = false;

  readonly services$: Observable<any> = this.store.pipe(
    select(servicesSelectors.getServices),
    tap(services => {
      if (!this.isInitializing || services.length <= 0) {
        return;
      }
      // Select the first service and first endpoint (For development of AYMME purpose)
      this.setSelectedEndpoint(services[0].endpoints[0]);
      this.isInitializing = false;
    })
  );
  readonly hasServices$: Observable<any> = this.store.pipe(
    select(servicesSelectors.hasServices)
  );
  readonly selectedEndpoint$: Observable<any> = this.store.pipe(
    select(servicesSelectors.getSelectedEndpoint)
  );

  constructor(
    private store: Store<any>,
    private homeService: HomeService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.store.dispatch(new servicesActions.LoadServices());
    this.allHidden = false;
    return false;
  }

  customFormat(endpoint: string, serviceName: string): string {
    return endpoint
      .replace('/gateway/api', '')
      .replace(serviceName, '')
      .replace('//client-api/v2', '');
  }

  toggleAll(services: any[]) {
    this.allHidden = !this.allHidden;
    services.map(service => (service.hidden = this.allHidden));
    return false;
  }

  deleteService(serviceName: string) {
    this.store.dispatch(new servicesActions.DeleteService(serviceName));
    return false;
  }

  setSelectedEndpoint(endpoint: Endpoint) {
    this.store.dispatch(new servicesActions.LoadSelectedEndpoint(endpoint));
  }
}
