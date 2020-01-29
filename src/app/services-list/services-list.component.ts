import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { HomeService } from '../home/home.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as servicesSelectors from '../service/state/services.selectors';
import * as servicesActions from "../service/state/services.actions";
import { tap, catchError } from 'rxjs/operators';
import { Service } from '../service/service.interface';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  readonly services$: Observable<any> = this.store.pipe(select(servicesSelectors.getServices));
  deleteService$: Observable<any>;
  allOpen: boolean = false;

  constructor(
    private store: Store<any>,
    private homeService: HomeService,
    private toastr: ToastrService,
    private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new servicesActions.LoadServices());
  }

  customFormat(endpoint: string, serviceName: string): string {
    return endpoint
      .replace('/gateway/api', '')
      .replace(serviceName, '')
      .replace('//client-api/v2', '');
  }

  toggleAll(services: any[]) {
    this.allOpen = !this.allOpen;
    services.map(service => service.open = this.allOpen);
  }

  deleteService(serviceName: string) {
    this.deleteService$ = this.homeService.deleteService(serviceName).pipe(
      tap(() => {
        this.store.dispatch(new servicesActions.DeleteServiceSuccess(serviceName));
        this.toastr.success('Deleted successfully!', serviceName);
      }),
      catchError ((errorResponse) => {
        this.store.dispatch(new servicesActions.DeleteServiceFailure(errorResponse));
        this.toastr.error('Could not delete the service.', errorResponse );
        return errorResponse;
      })
    );
  }
}
